import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Setups } from './Setups';
import { SetupParameters } from './SetupParameters';

@Entity('setup_values')
export class SetupValues {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Setups, { onDelete: 'CASCADE' })
    setup: Setups;

    @ManyToOne(() => SetupParameters, { onDelete: 'CASCADE' })
    parameter: SetupParameters;

    @Column({ type: 'jsonb' })
    value: Record<string, any>;

    @CreateDateColumn()
    createdAt: Date;
}
