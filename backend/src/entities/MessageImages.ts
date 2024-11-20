import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { PublicMessages } from './PublicMessages';
import { PrivateMessages } from './PrivateMessages';

@Entity('message_images')
export class MessageImages {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PublicMessages, { nullable: true, onDelete: 'CASCADE' })
    publicMessage: PublicMessages;

    @ManyToOne(() => PrivateMessages, { nullable: true, onDelete: 'CASCADE' })
    privateMessage: PrivateMessages;

    @Column()
    imagePath: string;

    @CreateDateColumn()
    uploadedAt: Date;
}
