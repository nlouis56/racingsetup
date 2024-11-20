import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from './Users';

@Entity('private_messages')
export class PrivateMessages {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    sender: Users;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    receiver: Users;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'boolean', default: false })
    isRead: boolean;
}
