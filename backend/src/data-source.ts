import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Channel } from "./entities/Channel";
import { Message } from "./entities/Message";
import { MessageReply } from "./entities/MessageReply";
import { MessageImage } from "./entities/MessageImage";
import { PrivateMessage } from "./entities/PrivateMessage";
import { ChannelSubscription } from "./entities/ChannelSubscription";
import { ChannelRole } from "./entities/ChannelRole";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Channel, Message, MessageReply, MessageImage, PrivateMessage, ChannelSubscription, ChannelRole],
  migrations: [],
  subscribers: [],
});
