import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { Users } from './Users';
import { Vehicles } from './Vehicles';

@Entity('saved_vehicles')
@Unique(['owner', 'name'])
export class SavedVehicles {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    owner: Users;

    @ManyToOne(() => Vehicles, { nullable: true, onDelete: 'SET NULL' })
    vehicle: Vehicles;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;
}
