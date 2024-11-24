import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { VehicleType, VehicleEnumType } from './VehicleType';

@Entity('vehicles')
export class Vehicles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({
        type: 'enum',
        enum: VehicleEnumType,
        enumName: 'vehicle_type',
    })
    vehicleType: VehicleEnumType;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;
}
