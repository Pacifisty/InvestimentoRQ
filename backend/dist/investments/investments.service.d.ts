import { Repository } from 'typeorm';
import { Investment } from './investment.entity';
import { ProjectsService } from '../projects/projects.service';
export declare class InvestmentsService {
    private investmentsRepository;
    private projectsService;
    constructor(investmentsRepository: Repository<Investment>, projectsService: ProjectsService);
    create(projectId: string, investorId: string, amount: number): Promise<Investment>;
    findByInvestor(investorId: string): Promise<Investment[]>;
    findByProject(projectId: string): Promise<Investment[]>;
}
