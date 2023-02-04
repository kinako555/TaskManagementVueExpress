import request from 'supertest';
import { app } from '../../app';
import * as Seeder from '../seeder/seeder'
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/user';
import { Repository } from 'typeorm';
import { setFirebaseAuthMock } from '../modules/mockModule';

let spy: jest.SpyInstance;
const BEFORE_CREATE_USER_COUNT: number = 5;
const userRepository: Repository<User> = AppDataSource.getRepository(User);

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

describe('POST /auth/oauthSignin', (): void => {
  test('usersTBLにレコードのないユーザーならusersレコードが作成される', async() => {
    const signinUser = {uid: "testUId", name: "testName", providerId: "testProvider"}
    spy = setFirebaseAuthMock(signinUser);
    expect.assertions(4);
    const requestParams = {providerId: "testProvider"};
    await request(app).post("/auth/oauthSignin").send(requestParams);
    const user: User = await userRepository.findOneByOrFail({id: signinUser.uid});

    expect(user.name).toBe(signinUser.name);
    expect(user.providerId).toBe(signinUser.providerId);
    expect(User.DeleteFlgValue.FALSE.equals(user.deleteFlg)).toBe(true);
    const usersCount: number = await userRepository.count();
    expect(usersCount).toBe(BEFORE_CREATE_USER_COUNT+1);
  });
  
  test('usersTBLにレコードのあるユーザーならusersレコードは作成されない', async() => {
    const signinUser: User =  await firstUser();
    spy = setFirebaseAuthMock({uid: signinUser.id, name: signinUser.name});
    expect.assertions(1);
    const requestParams = {providerId: "testProvider"};
    await request(app).post("/auth/oauthSignin").send(requestParams);
    const usersCount: number = await userRepository.count();
    expect(usersCount).toBe(BEFORE_CREATE_USER_COUNT);
  });
});