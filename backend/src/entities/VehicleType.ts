import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum VehicleEnumType {
    KART = 'kart',
    TRACK_CAR = 'track_car',
    ROAD_CAR = 'road_car',
    RALLY_CAR = 'rally_car',
}

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: VehicleEnumType,
        enumName: 'vehicle_type', // Use consistent naming to avoid recreation
    })
    type: VehicleType;
}
