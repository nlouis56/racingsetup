import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from './Users';

@Entity('public_messages')
export class PublicMessages {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    user: Users;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastActivity: Date;
}
