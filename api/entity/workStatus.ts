import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { Work } from "./work"

@Entity('work_status')
export class WorkStatus {

  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 20})
  name: string
  @OneToMany(() => Work, (work: Work) => work.workStatus)
  works: Work[]
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp

}
