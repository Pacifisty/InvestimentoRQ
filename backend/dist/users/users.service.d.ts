import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(name: string, email: string, password: string, role?: UserRole): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    sanitize(user: User): Omit<User, 'password'>;
}
