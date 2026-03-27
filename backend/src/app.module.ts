import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { InvestmentsModule } from './investments/investments.module';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Investment } from './investments/investment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH || 'investimento.db',
      entities: [User, Project, Investment],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    InvestmentsModule,
  ],
})
export class AppModule {}
