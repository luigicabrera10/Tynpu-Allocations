import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CreateProjectUseCase } from '../../../application/use-cases/project/create-project.use-case';
import { GetProjectsUseCase } from '../../../application/use-cases/project/get-projects.use-case';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly createUseCase: CreateProjectUseCase,
    private readonly getUseCase: GetProjectsUseCase,
  ) {}

  @Post()
  async create(@Body() body: { name: string; description?: string }) {
    return this.createUseCase.execute({
      name: body.name,
      description: body.description ?? null, // Convert undefined to null
    });
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.getUseCase.execute(Number(page) || 1, Number(limit) || 10);
  }
}