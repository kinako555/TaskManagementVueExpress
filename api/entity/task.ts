import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { User } from "./user"
import { TaskStatus } from "./taskStatus"

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 50})
  title: string
  @Column({nullable: true})
  content?: string
  @ManyToOne(() => User, (user) => user.tasks, {
    nullable: false,
    cascade: ['remove','update']
  })
  user: User
  @ManyToOne(() => TaskStatus, (taskStatus: TaskStatus) => taskStatus.tasks, {
    nullable: false,
    cascade: ['update']
  })
  taskStatus: TaskStatus
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp

}
