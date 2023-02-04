
import { User } from "../../entity/user";
import type { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { TaskFactory } from "./taskFactory";

export class UserFactory {
  id: string;
  name: string;
  providerId: string;

  constructor(params: any) {
    this.id         = params.id;
    this.name       = params.name;
    this.providerId = params.providerId;
  }

  public static create = (async(createCount: number): Promise<void>=>{
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    for (let i=1; i<=createCount; i++) {
      const user: User = userRepository.create({id: "uid"+i,
                                                name: "test"+i,
                                                providerId: "Google"});
      await userRepository.insert(user);
      await TaskFactory.create(5,user.id);
    }  
  });
  public static allRecordsDelete = (async():Promise<void>=>{
    await AppDataSource.createQueryBuilder().delete().from(User).execute();                                                              
  });
}