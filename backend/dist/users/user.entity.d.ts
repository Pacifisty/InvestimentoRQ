import { Project } from '../projects/project.entity';
import { Investment } from '../investments/investment.entity';
export declare enum UserRole {
    INVESTOR = "investor",
    ENTREPRENEUR = "entrepreneur",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    projects: Project[];
    investments: Investment[];
}
