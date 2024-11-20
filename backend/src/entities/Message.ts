import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";
import { MessageReply } from "./MessageReply";
import { MessageImage } from "./MessageImage";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Channel, (channel) => channel.messages, { onDelete: "CASCADE" })
  channel: Channel;

  @ManyToOne(() => User, (user) => user.messages, { nullable: true, onDelete: "SET NULL" })
  user: User;

  @Column()
  content: string;

  @Column({ default: false })
  isOfflineCached: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MessageReply, (reply) => reply.parentMessage)
  replies: MessageReply[];

  @OneToMany(() => MessageImage, (image) => image.message)
  images: MessageImage[];
}
