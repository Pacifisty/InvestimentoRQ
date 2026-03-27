import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

class CreateProjectDto {
  @IsNotEmpty() @IsString() title: string;
  @IsNotEmpty() @IsString() description: string;
  @IsNotEmpty() @IsString() problem: string;
  @IsNotEmpty() @IsString() solution: string;
  @IsNotEmpty() @IsString() revenueModel: string;
  @IsNumber() @Min(1) targetAmount: number;
  @IsOptional() @IsString() deadline?: string;
  @IsOptional() @IsString() returnType?: string;
  @IsOptional() @IsNumber() returnRate?: number;
  @IsOptional() @IsString() risks?: string;
  @IsOptional() @IsString() teamInfo?: string;
}

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllAdmin() {
    return this.projectsService.findAllAdmin();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMy(@Request() req: any) {
    return this.projectsService.findByOwner(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ENTREPRENEUR, UserRole.ADMIN)
  create(@Body() dto: CreateProjectDto, @Request() req: any) {
    return this.projectsService.create(dto, req.user.id);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  approve(@Param('id') id: string) {
    return this.projectsService.approve(id);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  reject(@Param('id') id: string) {
    return this.projectsService.reject(id);
  }
}
