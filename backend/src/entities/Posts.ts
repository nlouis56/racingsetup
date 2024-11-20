import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from './Users';
import { Setups } from './Setups';

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    user: Users;

    @ManyToOne(() => Setups, { nullable: true, onDelete: 'SET NULL' })
    setup: Setups;

    @Column({ type: 'text', nullable: true })
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}
