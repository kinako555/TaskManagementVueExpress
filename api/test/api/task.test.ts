import request from 'supertest';
import { app } from '../../app';
import * as Seeder from '../seeder/seeder'
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/user';
import { Task } from '../../entity/task';
import { Repository } from 'typeorm';
import { setFirebaseAuthMock } from '../modules/mockModule';
import { TaskStatus } from '../../entity/taskStatus';

let spy: jest.SpyInstance;
const BEFORE_CREATE_USER_COUNT: number = 5;
const userRepository: Repository<User> = AppDataSource.getRepository(User);
const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);

const firstUser = (async(): Promise<User> =>{
  let users: User[] = await userRepository.find(); 
  return users[0];
});
  
beforeAll(async()=>{
  await AppDataSource.initialize();
  await Seeder.allDelete();
  await Seeder.allCreate({userCount: BEFORE_CREATE_USER_COUNT});
});

beforeEach(async () => {
  await Seeder.deleteEach();
  await Seeder.createEach({userCount: BEFORE_CREATE_USER_COUNT});
});

afterEach(async() => {
  spy.mockRestore();
});

afterAll(async () => {
  await Seeder.allDelete();
});

describe('GET /tasks/[:searchWard]', (): void => {
  
  test('検索ワードがない場合、ログインユーザーのタスクを全て取得する', async()=>{
    const signinUser = await firstUser();
    spy = setFirebaseAuthMock({uid: signinUser.id, name: signinUser.name});
    const response = await request(app).get("/tasks").send();
    const getTaskIds: number[] = [];
    Object.keys(response.body.tasks).forEach((id: string) => { getTaskIds.push(Number(id)) });
    const signinUserTasks: Task[] = await taskRepository.find({where: {user: {id: signinUser.id}}});;
    expect.assertions(getTaskIds.length+1);
    expect(signinUserTasks.length).toBe(getTaskIds.length);
    for(const task of signinUserTasks) {
      expect(getTaskIds.includes(task.id)).toBe(true);
    }
  });
  // あいまい検索テストは省略
});

describe('POST /tasks/create', ():void => {

  test('タスクを作成するとtasksTBLレコードに登録される', async()=>{
    const signinUser = await firstUser();
    spy = setFirebaseAuthMock({uid: signinUser.id, name: signinUser.name});
    const beforeAllTasksCount = (await taskRepository.find()).length;
    const beforeUserTasksCount = (await taskRepository.find({where: {user: {id: signinUser.id}}})).length;
    const createTask ={
      title       : "createTitle",
      content     : "createCotent",
      taskStatusId: TaskStatus.ID.DURING,
      startDate   : "2022-04-03",
      endDate     : "2022-04-03",
    } as const
    await request(app).post("/tasks/create").send({task: createTask});
    const lastTask: Task = (await taskRepository.find({order: {id: "DESC"}}))[0];
    expect.assertions(8); 
    // リクエストしたパラメーター通りにタスクが作成されているかの確認
    expect(lastTask.userId).toBe(signinUser.id);
    expect(lastTask.title).toBe(createTask.title);
    expect(lastTask.content).toBe(createTask.content);
    expect(lastTask.taskStatusId).toBe(createTask.taskStatusId);
    expect(lastTask.startDate).toBe(createTask.startDate);
    expect(lastTask.endDate).toBe(createTask.endDate);

    // ログインユーザーのタスクが1増えているかの確認
    const afterAllTasksCount = (await taskRepository.find()).length;
    const afterUserTasksCount = (await taskRepository.find({where: {user: {id: signinUser.id}}})).length;
    expect(afterAllTasksCount).toBe(beforeAllTasksCount+1);
    expect(afterUserTasksCount).toBe(beforeUserTasksCount+1);
  });

  test('異なるユーザーIDを作成項目に指定しても、作成されたタスクのユーザーIDはログインユーザーのIDとなる', async()=>{
    const users: User[] = await userRepository.find();
    const signinUser = users[0];
    spy = setFirebaseAuthMock({uid: signinUser.id, name: signinUser.name});
    const beforeAllTasksCount = (await taskRepository.find()).length;
    const beforeUserTasksCount = (await taskRepository.find({where: {user: {id: signinUser.id}}})).length;
    const otherUser = users[1];
    const createTask ={
      title       : "createTitle",
      content     : "createCotent",
      taskStatusId: TaskStatus.ID.DURING,
      userId      : otherUser.id,
      startDate   : "2022-04-03",
      endDate     : "2022-04-03",
    } as const
    await request(app).post("/tasks/create").send({task: createTask});
    const lastTask: Task = (await taskRepository.find({order: {id: "DESC"}}))[0];
    expect.assertions(3); 
    // 作成されたタスクはログインユーザーのタスクとなっているかの確認
    expect(lastTask.userId).toBe(signinUser.id);

    // ログインユーザーのタスクが1増えているかの確認
    const afterAllTasksCount = (await taskRepository.find()).length;
    const afterUserTasksCount = (await taskRepository.find({where: {user: {id: signinUser.id}}})).length;
    expect(afterAllTasksCount).toBe(beforeAllTasksCount+1);
    expect(afterUserTasksCount).toBe(beforeUserTasksCount+1);
  });

});