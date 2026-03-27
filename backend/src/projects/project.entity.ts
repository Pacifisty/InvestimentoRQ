import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Investment } from '../investments/investment.entity';

export enum ProjectStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ACTIVE = 'active',
  CLOSED = 'closed',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  problem: string;

  @Column('text')
  solution: string;

  @Column('text')
  revenueModel: string;

  @Column('decimal', { precision: 15, scale: 2 })
  targetAmount: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  raisedAmount: number;

  @Column({ type: 'text', default: ProjectStatus.PENDING })
  status: ProjectStatus;

  @Column('text', { nullable: true })
  deadline: string;

  @Column('text', { nullable: true })
  returnType: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  returnRate: number;

  @Column('text', { nullable: true })
  risks: string;

  @Column('text', { nullable: true })
  teamInfo: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Investment, (investment) => investment.project)
  investments: Investment[];
}
