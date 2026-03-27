import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment, InvestmentStatus } from './investment.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
    private projectsService: ProjectsService,
  ) {}

  async create(projectId: string, investorId: string, amount: number): Promise<Investment> {
    await this.projectsService.findById(projectId);
    const investment = this.investmentsRepository.create({
      projectId,
      investorId,
      amount,
      status: InvestmentStatus.CONFIRMED,
    });
    const saved = await this.investmentsRepository.save(investment);
    await this.projectsService.updateRaisedAmount(projectId, amount);
    return saved;
  }

  async findByInvestor(investorId: string): Promise<Investment[]> {
    return this.investmentsRepository.find({
      where: { investorId },
      relations: ['project'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByProject(projectId: string): Promise<Investment[]> {
    return this.investmentsRepository.find({
      where: { projectId },
      relations: ['investor'],
      order: { createdAt: 'DESC' },
    });
  }
}
