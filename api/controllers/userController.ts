import { getAuth } from "firebase-admin/auth";
import * as express from "express";
import { AppDataSource } from '../data-source'
import { User } from '../entity/user'
import type { Repository } from 'typeorm'
import type { DecodedIdToken } from "firebase-admin/auth";
import { format } from "date-fns";

export async function deleteUser(req:  express.Request, 
                                 res:  express.Response, 
                                 next: express.NextFunction): Promise<void>{
  try {
    const JWT_TOKEN: string = req.body.idToken;
    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(JWT_TOKEN);
    const uid = decodedToken.uid;
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    let user = await userRepository.findOneByOrFail({id: uid, deleteFlg: User.DeleteFlgValue['FALSE']});
    user.deleteFlg = User.DeleteFlgValue['TRUE'];
    user.deletedAt = format(new Date(), 'yyyyMMdd hh:mm'); // 現在日付を設定
    userRepository.save(user);
    res.json({status: 200,
              message: 'success delete user'});
  } catch (error) {
    next(error);
  }
}
