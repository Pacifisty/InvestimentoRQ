import { ProjectsService } from './projects.service';
declare class CreateProjectDto {
    title: string;
    description: string;
    problem: string;
    solution: string;
    revenueModel: string;
    targetAmount: number;
    deadline?: string;
    returnType?: string;
    returnRate?: number;
    risks?: string;
    teamInfo?: string;
}
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<import("./project.entity").Project[]>;
    findAllAdmin(): Promise<import("./project.entity").Project[]>;
    findMy(req: any): Promise<import("./project.entity").Project[]>;
    findOne(id: string): Promise<import("./project.entity").Project>;
    create(dto: CreateProjectDto, req: any): Promise<import("./project.entity").Project>;
    approve(id: string): Promise<import("./project.entity").Project>;
    reject(id: string): Promise<import("./project.entity").Project>;
}
export {};
