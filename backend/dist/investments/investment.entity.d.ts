import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
export declare enum InvestmentStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed"
}
export declare class Investment {
    id: string;
    projectId: string;
    project: Project;
    investorId: string;
    investor: User;
    amount: number;
    status: InvestmentStatus;
    createdAt: Date;
}
