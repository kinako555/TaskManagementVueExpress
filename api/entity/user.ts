import { Entity, PrimaryColumn, Column, OneToMany, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { Work } from "./work"

@Entity('users')
export class User {

  @PrimaryColumn({length: 50})
  id: string
  @Column({length: 50})
  name: string
  @OneToMany(() => Work, (work) => work.user)
  works: Work[]
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp

}
