import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { PublicMessages } from './PublicMessages';
import { Users } from './Users';

@Entity('public_message_replies')
export class PublicMessageReplies {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PublicMessages, { onDelete: 'CASCADE' })
    parentMessage: PublicMessages;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    user: Users;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}
