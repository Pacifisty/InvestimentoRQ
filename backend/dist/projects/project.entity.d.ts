import { User } from '../users/user.entity';
import { Investment } from '../investments/investment.entity';
export declare enum ProjectStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    ACTIVE = "active",
    CLOSED = "closed"
}
export declare class Project {
    id: string;
    ownerId: string;
    owner: User;
    title: string;
    description: string;
    problem: string;
    solution: string;
    revenueModel: string;
    targetAmount: number;
    raisedAmount: number;
    status: ProjectStatus;
    deadline: string;
    returnType: string;
    returnRate: number;
    risks: string;
    teamInfo: string;
    createdAt: Date;
    investments: Investment[];
}
