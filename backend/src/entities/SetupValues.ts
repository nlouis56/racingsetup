import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Setups } from './Setups';
import { SetupParameters } from './SetupParameters';

@Entity('setup_values')
export class SetupValues {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Setups, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'setup_id' })
    setup: Setups;

    @ManyToOne(() => SetupParameters, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parameter_id' })
    parameter: SetupParameters;

    @Column({ type: 'jsonb' })
    value: Record<string, any>;

    @CreateDateColumn()
    @Column({ name: 'created_at' })
    createdAt: Date;
}
