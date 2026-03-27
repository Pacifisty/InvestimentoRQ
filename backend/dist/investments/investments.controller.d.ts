import { InvestmentsService } from './investments.service';
declare class CreateInvestmentDto {
    projectId: string;
    amount: number;
}
export declare class InvestmentsController {
    private investmentsService;
    constructor(investmentsService: InvestmentsService);
    create(dto: CreateInvestmentDto, req: any): Promise<import("./investment.entity").Investment>;
    findMy(req: any): Promise<import("./investment.entity").Investment[]>;
    findByProject(id: string): Promise<import("./investment.entity").Investment[]>;
}
export {};
