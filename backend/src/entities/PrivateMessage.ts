import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class PrivateMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentMessages, { onDelete: "SET NULL" })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, { onDelete: "SET NULL" })
  receiver: User;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isRead: boolean;
}
