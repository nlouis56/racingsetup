import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Users } from './Users';
import { AuthEnumType } from './AuthType';

@Entity('user_auth')
@Unique(['user', 'authType'])
export class UserAuth {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, { onDelete: 'CASCADE' })
    user: Users;

    @Column({
        type: 'enum',
        enum: AuthEnumType, // Utilise l'enum défini dans TypeScript
        enumName: 'auth_type', // Associe l'enum au type ENUM existant dans PostgreSQL
    })
    authType: AuthEnumType;

    @Column({ type: 'text', nullable: true })
    authToken: string;
}
