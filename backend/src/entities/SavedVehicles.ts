import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Users } from './Users';
import { Vehicles } from './Vehicles';

@Entity('saved_vehicles')
export class SavedVehicles {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'owner_id' }) // Mappe à la colonne "owner_id" dans la base de données
    owner: Users;

    @ManyToOne(() => Vehicles, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'vehicle_id' }) // Mappe à la colonne "vehicle_id" dans la base de données
    vehicle: Vehicles;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
