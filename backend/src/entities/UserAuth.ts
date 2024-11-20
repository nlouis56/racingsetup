import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Users } from './Users';
import { AuthType } from './CustomTypes';

@Entity('user_auth')
@Unique(['user', 'authType'])
export class UserAuth {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { onDelete: 'CASCADE' })
    user: Users;

    @Column({ type: 'enum', enum: AuthType })
    authType: AuthType;

    @Column({ type: 'text', nullable: true })
    authToken: string;
}
