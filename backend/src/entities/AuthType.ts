import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum AuthEnumType {
    EMAIL = 'email',
    GOOGLE = 'google',
}

@Entity()
export class AuthType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AuthEnumType,
        enumName: 'auth_type', // Use consistent naming to avoid recreation
    })
    type: AuthType;
}
