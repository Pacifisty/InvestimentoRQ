import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './investment.entity';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), ProjectsModule],
  providers: [InvestmentsService],
  controllers: [InvestmentsController],
})
export class InvestmentsModule {}
