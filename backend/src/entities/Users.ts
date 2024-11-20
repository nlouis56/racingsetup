import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Teams } from './Teams';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column('text')
    passwordHash: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ length: 50 })
    displayName: string;

    @Column({ nullable: true })
    racingNumber: number;

    @ManyToOne(() => Teams, (team) => team.users, { nullable: true, onDelete: 'SET NULL' })
    team: Teams;

    @Column({ nullable: true })
    profilePicturePath: string;

    @Column({ nullable: true })
    bannerPicturePath: string;

    @CreateDateColumn()
    createdAt: Date;
}
