import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, Timestamp, CreateDateColumn, JoinColumn, RelationId } from "typeorm";
import { User } from "./user";
import { TaskStatus } from "./taskStatus";

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50})
  title: string;

  @Column({nullable: true})
  content?: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    nullable: false,
    cascade: ["insert","update","remove"],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => TaskStatus, (taskStatus: TaskStatus) => taskStatus.tasks, {
    nullable: false,
    cascade: ["insert","update","remove"],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'task_status_id' })
  taskStatus: TaskStatus;

  @Column({ name: 'task_status_id' })
  taskStatusId: number;

  @Column({name: 'start_date',
           type: 'date',
           default: null,
           nullable: true})
  startDate: string;

  @Column({name: 'end_date',
           type: 'date',
           default: null,
           nullable: true})
  endDate: string;
  
  @CreateDateColumn({name: 'created_at'})
  createdAt: Timestamp;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Timestamp;
}
