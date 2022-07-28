import { getAuth } from "firebase-admin/auth";
import * as express from "express";
import type { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entity/user'
import type { Auth, DecodedIdToken, UserRecord } from "firebase-admin/auth";

export async function list(req:  express.Request, 
                             res:  express.Response, 
                             next: express.NextFunction): Promise<void>{
  try {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(req.body.idToken);
    let user: User = await userRepository.findOneByOrFail({id: decodedToken.id});
    res.json({tasks: user.tasks});
  } catch (error) {
    next(error);
  }
}