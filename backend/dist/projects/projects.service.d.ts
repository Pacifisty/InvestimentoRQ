import { Repository } from 'typeorm';
import { Project } from './project.entity';
export declare class ProjectsService {
    private projectsRepository;
    constructor(projectsRepository: Repository<Project>);
    create(data: Partial<Project>, ownerId: string): Promise<Project>;
    findAll(): Promise<Project[]>;
    findAllAdmin(): Promise<Project[]>;
    findById(id: string): Promise<Project>;
    findByOwner(ownerId: string): Promise<Project[]>;
    approve(id: string): Promise<Project>;
    reject(id: string): Promise<Project>;
    updateRaisedAmount(id: string, amount: number): Promise<void>;
}
