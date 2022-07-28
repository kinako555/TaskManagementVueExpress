import { Entity, PrimaryColumn, Column, OneToMany, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { Task } from "./task"

@Entity('users')
export class User {

  @PrimaryColumn({length: 50})
  id: string
  @Column({length: 50})
  name: string
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp

}
