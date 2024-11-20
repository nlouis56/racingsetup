import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Message } from "./Message";

@Entity()
export class MessageImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Message, (message) => message.images, { onDelete: "CASCADE" })
  message: Message;

  @Column()
  imagePath: string; // Chemin d'accès local de l'image

  @CreateDateColumn()
  uploadedAt: Date;
}
