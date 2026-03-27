import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { IsNumber, IsUUID, Min } from 'class-validator';
import { InvestmentsService } from './investments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

class CreateInvestmentDto {
  @IsUUID() projectId: string;
  @IsNumber() @Min(1) amount: number;
}

@Controller('investments')
@UseGuards(JwtAuthGuard)
export class InvestmentsController {
  constructor(private investmentsService: InvestmentsService) {}

  @Post()
  @Roles(UserRole.INVESTOR, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateInvestmentDto, @Request() req: any) {
    return this.investmentsService.create(dto.projectId, req.user.id, dto.amount);
  }

  @Get('my')
  findMy(@Request() req: any) {
    return this.investmentsService.findByInvestor(req.user.id);
  }

  @Get('project/:id')
  findByProject(@Param('id') id: string) {
    return this.investmentsService.findByProject(id);
  }
}
