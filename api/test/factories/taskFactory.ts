import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Task } from "../../entity/task";
import { TaskStatus } from "../../entity/taskStatus";

export class TaskFactory {
  title: string;
  content: string;
  taskStatusId: number;
  startDate: Date;
  endDate: Date;
  userId: string;

  constructor(params: any) {
    this.title        = params.title;
    this.content      = params.content;
    this.taskStatusId = params.taskStatusId;
    this.startDate    = params.startDate;
    this.endDate      = params.endDate;
    this.userId       = params.userId;
  }

  public static create = (async(createCount: number, userId: string): Promise<void> =>{
    const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);
    for (let i=1; i<=createCount; i++) {
      const task:Task = taskRepository.create({
        title       : userId+"-title-"+i,
        content     : userId+"-content-"+i,
        taskStatusId: TaskFactory.taskStatusIdSetAtCreation(i),
        startDate   : "2022/1/"+i,
        endDate     : "2022/2/"+i,
        user        : {id: userId}
      });
      await taskRepository.insert(task);
    }
  });

  /***
   * taskNumberに応じてtaskStatusIdを返す
   * てきとうにきめている
   */
  private static taskStatusIdSetAtCreation = ((taskNumber: number): number =>{
    switch (taskNumber) {
      case 0:
      case 1:
        return TaskStatus.ID.OUT_STANDING;
      case 2:
        return TaskStatus.ID.DURING;
      case 3:
        return TaskStatus.ID.PENDING;
      case 4:
      default:
        return TaskStatus.ID.CLOSED;
    }
  });
}