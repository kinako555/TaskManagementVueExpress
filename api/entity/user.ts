import { Hash } from "crypto";
import { Entity, PrimaryColumn, Column, OneToMany, UpdateDateColumn, Timestamp, CreateDateColumn } from "typeorm"
import { Task } from "./task"

@Entity('users')
export class User {

  static DeleteFlgValue = { "TRUE":  Buffer.alloc(1, 1), /* 論理削除済 */
                            "FALSE": Buffer.alloc(1, 0) /* 論理未削除*/ };

  public isActive(): boolean {
    const deleteFlg: Boolean = Boolean(this.deleteFlg.readInt8());
    return !deleteFlg;
  }

  @PrimaryColumn({length: 50})
  id: string;
  @Column({length: 50})
  name: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
  @Column({name: 'provider_id'})
  providerId: string;
  @Column({name: 'delete_flg', 
           type: 'bit',
           default: "b'0'"})
  deleteFlg: Buffer;
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp;
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp;
  @Column({name: 'deleted_at',
           type: 'datetime',
           default: null,
           nullable: true})
  deletedAt: string;
}
