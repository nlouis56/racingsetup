import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { SavedVehicles } from './SavedVehicles';

@Entity('setups')
export class Setups {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SavedVehicles, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'vehicle_id' }) // Définit explicitement le nom de la colonne
    vehicle: SavedVehicles;

    @ManyToOne(() => Users, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' }) // Définit explicitement le nom de la colonne
    user: Users;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    track: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
