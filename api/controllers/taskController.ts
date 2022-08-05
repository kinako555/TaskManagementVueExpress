import { getAuth } from "firebase-admin/auth";
import * as express from "express";
import type { Repository } from 'typeorm';
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
    const tasks: Task[]                = await taskRepository.findBy({user: {id: decodedToken.uid}});
    const allTaskStatus: TaskStatus[]  = await taskStatusRepository.find();
    res.json({tasks: tasks,
              taskStatus: allTaskStatus});
  } catch (error) {
    next(error);
  }
}