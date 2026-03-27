import { AuthService } from './auth.service';
import { UserRole } from '../users/user.entity';
declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: Omit<import("../users/user.entity").User, "password">;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: Omit<import("../users/user.entity").User, "password">;
    }>;
}
export {};
