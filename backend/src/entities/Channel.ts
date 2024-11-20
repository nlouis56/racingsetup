import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { ChannelSubscription } from "./ChannelSubscription";
import { Message } from "./Message";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  theme: string;

  @ManyToOne(() => User, (user) => user.channels, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isPrivate: boolean;

  @OneToMany(() => ChannelSubscription, (subscription) => subscription.channel)
  subscriptions: ChannelSubscription[];

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[];
}
