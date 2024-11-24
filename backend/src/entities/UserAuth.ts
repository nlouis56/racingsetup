import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Users } from './Users';
import { AuthType, AuthEnumType } from './AuthType';

@Entity('user_auth')
@Unique(['user', 'authType'])
export class UserAuth {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { onDelete: 'CASCADE' })
    user: Users;

    @Column({
        type: 'enum',
        enum: AuthEnumType,
        enumName: 'auth_type',
    })
    authType: AuthEnumType;

    @Column({ type: 'text', nullable: true })
    authToken: string;
}
