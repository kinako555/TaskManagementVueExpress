import { Entity, PrimaryColumn, Column, OneToMany, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { Task } from "./task"

@Entity('task_status')
export class TaskStatus {

  @PrimaryColumn()
  id: number;

  @Column({length: 20})
  name: string;

  @OneToMany(() => Task, (task: Task) => task.taskStatus)
  tasks: Task[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp;

  public static ID: taskStatusIds = {
    OUT_STANDING: 1,
    DURING      : 2,
    PENDING     : 3,
    CLOSED      : 4
  } as const;

}

type taskStatusIds = {
  OUT_STANDING: number;
  DURING      : number;
  PENDING     : number;
  CLOSED      : number;
}