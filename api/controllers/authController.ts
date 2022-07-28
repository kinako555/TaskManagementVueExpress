import { getAuth } from "firebase-admin/auth";
import * as express from "express";
import { AppDataSource } from '../data-source'
import { User } from '../entity/user'
import type { Repository } from 'typeorm'
import type { Auth, DecodedIdToken, UserRecord } from "firebase-admin/auth";

export async function signin(req:  express.Request, 
                             res:  express.Response, 
                             next: express.NextFunction): Promise<void>{
  try {
    const JWT_TOKEN: string = req.body.idToken;
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(JWT_TOKEN);
    const uid = decodedToken.uid;
    const user = await getOrCreateUser(uid);
    res.json({user});
  } catch (error) {
    next(error);
  }
}

export async function oautnSignin(req:  express.Request, 
                                  res:  express.Response, 
                                  next: express.NextFunction): Promise<void>{
  try {
    const auth: Auth = getAuth();
    const JWT_TOKEN: string  = req.body.idToken;
    // const providerId: string  = req.body.providerId;
    const decodedToken: DecodedIdToken = await auth.verifyIdToken(JWT_TOKEN);
    const userRecord: UserRecord       = await auth.getUser(decodedToken.uid);
    const user = await getOrCreateUser(userRecord.uid, userRecord.displayName);
    res.json({user});
  } catch (error) {
    next(error);
  }
}

async function getOrCreateUser(id: string, userName: string = "test"): Promise<User> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  let user: User|null = await userRepository.findOneBy({id: id});
  if (user) return user;
  user = await userRepository.save({id: id, name: userName});
  return user;
}
