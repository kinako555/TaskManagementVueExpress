import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { Task } from "./task"

@Entity('task_status')
export class TaskStatus {

  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 20})
  name: string
  @OneToMany(() => Task, (task: Task) => task.taskStatus)
  tasks: Task[]
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp

}
