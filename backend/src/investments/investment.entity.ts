import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

export enum InvestmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
}

@Entity()
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.investments)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  investorId: string;

  @ManyToOne(() => User, (user) => user.investments)
  @JoinColumn({ name: 'investorId' })
  investor: User;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'text', default: InvestmentStatus.CONFIRMED })
  status: InvestmentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
