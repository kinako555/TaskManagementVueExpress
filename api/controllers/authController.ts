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
    const idToken: any = req.headers.authorization;
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const user = await getOrCreateUser(uid, 'original', 'test');
    if (user.isActive()) {
      res.json({uid: user.id});
    } else {
      res.render('index', { title: 'Not Active User' });
    }
  } catch (error) {
    next(error);
  }
}

export async function oautnSignin(req:  express.Request, 
                                  res:  express.Response, 
                                  next: express.NextFunction): Promise<void>{
  try {
    const auth: Auth = getAuth();
    const idToken: any = req.headers.authorization;
    const providerId: string  = req.body.providerId;
    const decodedToken: DecodedIdToken = await auth.verifyIdToken(idToken);
    const userRecord: UserRecord       = await auth.getUser(decodedToken.uid);
    const user = await getOrCreateUser(userRecord.uid, providerId, userRecord.displayName);
    if (user.isActive()) {
      res.json({uid: user.id});
    } else {
      res.render('index', { title: 'Not Active User' });
    }
  } catch (error) {
    next(error);
  }
}

async function getOrCreateUser(id: string, providerId: string, userName: string = 'test'): Promise<User> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  let findUser: User|null = await userRepository.findOneBy({id: id});
  if (findUser) return findUser;
  let createdUser: User = userRepository.create({id: id, name: userName, providerId: providerId});
  await userRepository.insert(createdUser);
  return createdUser;
}
