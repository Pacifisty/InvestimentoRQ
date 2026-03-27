import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(name: string, email: string, password: string, role: UserRole = UserRole.INVESTOR): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, email, password: hashed, role });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  sanitize(user: User): Omit<User, 'password'> {
    const { password, ...rest } = user;
    return rest as Omit<User, 'password'>;
  }
}
