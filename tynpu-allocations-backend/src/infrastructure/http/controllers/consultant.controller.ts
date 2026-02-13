import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CreateConsultantUseCase } from '../../../application/use-cases/consultant/create-consultant.use-case';
import { GetConsultantsUseCase } from '../../../application/use-cases/consultant/get-consultants.use-case';

@Controller('consultants')
export class ConsultantController {
  constructor(
    private readonly createUseCase: CreateConsultantUseCase,
    private readonly getUseCase: GetConsultantsUseCase,
  ) {}

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    return this.createUseCase.execute(body);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.getUseCase.execute(Number(page) || 1, Number(limit) || 10);
  }
}