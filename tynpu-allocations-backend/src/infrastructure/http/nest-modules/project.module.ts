import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaProjectRepository } from '../../database/repositories/prisma-project.repository';
import { CreateProjectUseCase } from '../../../application/use-cases/project/create-project.use-case';
import { GetProjectsUseCase } from '../../../application/use-cases/project/get-projects.use-case';
import { ProjectController } from '../controllers/project.controller';

@Module({
  controllers: [ProjectController],
  providers: [
    PrismaService,
    { provide: 'ProjectRepository', useClass: PrismaProjectRepository },
    {
      provide: CreateProjectUseCase,
      inject: ['ProjectRepository'],
      useFactory: (repo) => new CreateProjectUseCase(repo),
    },
    {
      provide: GetProjectsUseCase,
      inject: ['ProjectRepository'],
      useFactory: (repo) => new GetProjectsUseCase(repo),
    },
  ],
  exports: [CreateProjectUseCase, GetProjectsUseCase],
})
export class ProjectModule {}