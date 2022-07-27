import { getAuth } from "firebase-admin/auth";
import * as express from "express";
import { AppDataSource } from '../data-source'
import { User } from '../entity/user'
import type { Repository } from 'typeorm'
import type { DecodedIdToken } from "firebase-admin/auth";

export async function signup(req: express.Request, 
                             res: express.Response, 
                             next: express.NextFunction): Promise<void>{
  try {
    const JWT_TOKEN: string = req.body.access_token;
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(JWT_TOKEN);
    const uid = decodedToken.uid;
    const user = await getOrCreateUser(uid);
    res.json({user});
  } catch (error) {
    next(error);
  }
}

async function getOrCreateUser(id: string): Promise<User> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  let user: User | null = null;
  user = await userRepository.findOneBy({id: id});
  if (user) return user;
  user = userRepository.create({id: id, name: "test"});
  return user;
}
