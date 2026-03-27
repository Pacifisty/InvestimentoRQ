import { Controller, Post, Body } from '@nestjs/common';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { UserRole } from '../users/user.entity';

class RegisterDto {
  @IsNotEmpty() @IsString() name: string;
  @IsEmail() email: string;
  @MinLength(6) password: string;
  @IsEnum(UserRole) role: UserRole;
}

class LoginDto {
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.name, dto.email, dto.password, dto.role);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
