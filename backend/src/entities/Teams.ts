import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('teams')
export class Teams {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'owner_id', type: 'int', nullable: true })
    ownerId: number;

    @Column({ length: 50 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'int', array: true, default: () => 'ARRAY[]::INT[]' })
    members: number[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
