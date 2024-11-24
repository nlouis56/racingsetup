import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { VehicleType } from './VehicleType';

@Entity('setup_parameters')
export class SetupParameters {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: VehicleType,
        enumName: 'vehicle_type',
        array: true,
    })
    applicableTo: VehicleType[];

    @CreateDateColumn()
    createdAt: Date;
}
