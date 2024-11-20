import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";

@Entity()
export class ChannelRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Channel, { onDelete: "CASCADE" })
  channel: Channel;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @Column()
  role: string; // Ex: "owner", "admin", "member"
}
