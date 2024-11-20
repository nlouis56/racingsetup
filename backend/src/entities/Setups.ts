import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from './Users';
import { Vehicles } from './Vehicles';

@Entity('setups')
export class Setups {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Vehicles, { nullable: true, onDelete: 'SET NULL' })
    vehicle: Vehicles;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    user: Users;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    track: string;

    @CreateDateColumn()
    createdAt: Date;
}
