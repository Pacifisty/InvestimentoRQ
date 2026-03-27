import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../users/user.entity").User>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: Omit<import("../users/user.entity").User, "password">;
    }>;
    register(name: string, email: string, password: string, role: UserRole): Promise<{
        access_token: string;
        user: Omit<import("../users/user.entity").User, "password">;
    }>;
}
