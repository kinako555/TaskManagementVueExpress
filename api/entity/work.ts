import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { User } from "./user"
import { WorkStatus } from "./workStatus"

@Entity('works')
export class Work {

  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 50})
  title: string
  @Column({nullable: true})
  content?: string
  @ManyToOne(() => User, (user) => user.works, {
    nullable: false,
    cascade: ['remove','update']
  })
  user: User
  @ManyToOne(() => WorkStatus, (workStatus: WorkStatus) => workStatus.works, {
    nullable: false,
    cascade: ['update']
  })
  workStatus: WorkStatus
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp

}
