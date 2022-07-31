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
  @Column({name: 'provider_id'})
  providerId: string
  @Column({name: 'delete_flg', 
           type: 'bit', 
           length: 1,
           default: 0})
  deleteFlg: boolean
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp
  @Column({name: 'deleted_at'})
  deletedAt: Date

}
