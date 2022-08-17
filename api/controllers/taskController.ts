import { getAuth } from "firebase-admin/auth";
import * as express from "express";
import type { Repository, FindOptionsSelect, DeleteResult, UpdateResult } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/task';
import { TaskStatus } from "../entity/taskStatus";
import type { DecodedIdToken } from "firebase-admin/auth";

export async function getTasks(req:  express.Request, 
                               res:  express.Response, 
                               next: express.NextFunction): Promise<void>{
  try {
    const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);
    const taskStatusRepository: Repository<TaskStatus> = AppDataSource.getRepository(TaskStatus);
    const idToken: any = req.headers.authorization;
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(idToken);
    const taskSelectColumns: FindOptionsSelect<Task> = {id: true, 
                                                        title: true, 
                                                        content: true, 
                                                        startDate: true, 
                                                        endDate: true, 
                                                        taskStatusId: true};
    const _tasks: Task[] = await taskRepository.find({select: taskSelectColumns, 
                                                      where: {user: {id: decodedToken.uid}}}); // Map変換前の一時使用変数
    const tasks: Map<number, Task> = new Map<number, Task>();
    _tasks.map((x: Task) =>tasks.set(x.id, x)); // 配列からMapに変換
    const _allTaskStatus = await taskStatusRepository.find({select: {id: true, name: true}}); // Map変換前の一時使用変数
    const allTaskStatus: Map<number, TaskStatus> = new Map<number, TaskStatus>();
    _allTaskStatus.map((x: TaskStatus) =>allTaskStatus.set(x.id, x)); // 配列からMapに変換
    res.json({tasks: Object.fromEntries(tasks),
              taskStatus: Object.fromEntries(allTaskStatus)});// MapをJsonに加工するのに必要な処理);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req:  express.Request, 
                                 res:  express.Response, 
                                 next: express.NextFunction): Promise<void>{
  try {
    const idToken: any = req.headers.authorization;
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(idToken);
    const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);
    let createTask: CreateTask = formatCreateTask(req.body.task, decodedToken.uid);
    let result = await taskRepository.insert(createTask);
    const resTask: ResponseTask = formatResponseTask(createTask,  result.identifiers[0].id);
    res.json({createdTask: resTask});
  } catch (error) {
    next(error); 
  }
}

export async function updateTask(req:  express.Request, 
                                 res:  express.Response, 
                                 next: express.NextFunction): Promise<void>{
  
  try {
    const idToken: any = req.headers.authorization;
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(idToken);
    const updateTaskId: number = Number(req.params.taskId);
    const updateTaskParams = formatUpdateTask(req.body.task);
    const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);
    const result: UpdateResult = await taskRepository.update({id: updateTaskId, user: { id: decodedToken.uid }}, 
                                                              updateTaskParams);
    if (!result.affected) res.status(400); // 更新時のエラーは例外処理になるはず
    const responseTask: ResponseTask = formatResponseTask(updateTaskParams, updateTaskId)
    res.json({updatedTask: responseTask});
  } catch (error) {
    next(error);
  }
  
}

export async function deleteTask(req:  express.Request, 
                                 res:  express.Response, 
                                 next: express.NextFunction): Promise<void>{
    try {
      const idToken: any = req.headers.authorization;
      const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(idToken);
      const deleteTaskId: number = Number(req.params.taskId);
      const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);
      const result: DeleteResult = await taskRepository.delete({id: deleteTaskId, user: {id: decodedToken.uid}});
      if (!result.affected) res.status(400);
      res.json({message: "task delete success"});
    } catch (error) {
      next(error);
    }
}


function formatCreateTask(reqestTask: any, uid: string){
  const rtn: CreateTask = {
    user: {id: uid},
    title: reqestTask.title,
    taskStatusId: reqestTask.taskStatusId,
    startDate: reqestTask.startDate,
    endDate: reqestTask.endDate,
    content: reqestTask.content,
  }
  return rtn;
}

function formatUpdateTask(reqestTask: any){
  const rtn: UpdateTask = {
    title: reqestTask.title,
    taskStatusId: reqestTask.taskStatusId,
    startDate: reqestTask.startDate,
    endDate: reqestTask.endDate,
    content: reqestTask.content,
  }
  return rtn;
}

function formatResponseTask(task: any, id?: number) {
  const rtn: ResponseTask = {
    id: 0,
    title: task.title,
    taskStatusId: task.taskStatusId,
    startDate: task.startDate,
    endDate: task.endDate,
    content: task.content,
  }
  rtn.id = id ? id : task.id;
  return rtn;
}

interface CreateTask {
  user: {id: string},
  title: string,
  taskStatusId: number,
  startDate: string,
  endDate: string,
  content: string,
}

interface UpdateTask {
  title: string,
  taskStatusId: number,
  startDate: string,
  endDate: string,
  content: string,
}

interface ResponseTask {
  id: number,
  title: string,
  taskStatusId: number,
  startDate: string,
  endDate: string,
  content: string,
}