import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Investment } from '../investments/investment.entity';

export enum UserRole {
  INVESTOR = 'investor',
  ENTREPRENEUR = 'entrepreneur',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', default: UserRole.INVESTOR })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @OneToMany(() => Investment, (investment) => investment.investor)
  investments: Investment[];
}
