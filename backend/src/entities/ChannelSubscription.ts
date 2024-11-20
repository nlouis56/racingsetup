import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";

@Entity()
export class ChannelSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.subscriptions, { onDelete: "CASCADE" })
  channel: Channel;

  @Column({ default: "follower" })
  role: string; // Ex: "follower", "subscriber", "moderator"
}
