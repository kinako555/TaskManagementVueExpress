import { getAuth } from "firebase-admin/auth";
import * as express from "express";
import { AppDataSource } from '@/data-source'
import { User } from '@/entity/user'
import type { Repository } from 'typeorm'
import { logger } from "@/log/loggler";

logger.level = "debug";

export async function signup(req: express.Request, res: express.Response, next: express.NextFunction) {
  const JWT_TOKEN: string = req.params.access_token;
  getAuth().verifyIdToken(JWT_TOKEN)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      const user = getOrCreateUser(uid);
      res.send({user: user});
    })
    .catch((error) => {
      logger.error(error);
    });
}

function getOrCreateUser(id: string): User {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  let user: User | null = null;
  (async() => {
    user = await userRepository.findOneBy({id: id});
  });
  if (user) return user;
  user = userRepository.create({id: id, name: "test"});
  return user;
}
