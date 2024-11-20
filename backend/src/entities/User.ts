import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Channel } from "./Channel";
import { ChannelSubscription } from "./ChannelSubscription";
import { Message } from "./Message";
import { PrivateMessage } from "./PrivateMessage";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column()
  racingNumber: number;

  @Column({nullable: true})
  teamId: number;

  @Column({ nullable: true })
  profilePicturePath: string;

  @Column({ nullable: true })
  bannerPicturePath: string;

  @CreateDateColumn()
  createdAt: Date;
}
