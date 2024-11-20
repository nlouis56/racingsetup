import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@Entity()
export class MessageReply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Message, (message) => message.replies, { onDelete: "CASCADE" })
  parentMessage: Message;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  user: User;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
