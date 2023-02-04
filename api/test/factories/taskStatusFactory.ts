
import { AppDataSource } from "../../data-source";
import { TaskStatus } from "../../entity/taskStatus";
import { Repository } from "typeorm";


export class TaskStatusFacroty {
  public static create = (async(): Promise<void>=>{
    const taskRepository: Repository<TaskStatus> = AppDataSource.getRepository(TaskStatus);
    await taskRepository.insert([{id: TaskStatus.ID.OUT_STANDING, name: "未対応"},
                                 {id: TaskStatus.ID.DURING      , name: "対応中"},
                                 {id: TaskStatus.ID.PENDING     , name: "保留"},
                                 {id: TaskStatus.ID.CLOSED      , name: "完了"}]);
  });

  public static allRecordsDelete = (async():Promise<void>=>{
    await AppDataSource.createQueryBuilder().delete().from(TaskStatus).execute();                                                              
  });
}