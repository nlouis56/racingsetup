import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 320 })
    email: string;

    @Column({ name: 'password_hash', type: 'text' })
    passwordHash: string;

    @Column({ name: 'first_name', length: 50 })
    firstName: string;

    @Column({ name: 'last_name', length: 50 })
    lastName: string;

    @Column({ name: 'display_name', length: 50 })
    displayName: string;

    @Column({ name: 'racing_number', type: 'int', nullable: true })
    racingNumber: number;

    @Column({ name: 'profile_picture_path', type: 'text', nullable: true })
    profilePicturePath: string;

    @Column({ name: 'banner_picture_path', type: 'text', nullable: true })
    bannerPicturePath: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'is_admin', type: 'boolean', default: false })
    isAdmin: boolean;
}
