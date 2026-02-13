import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaConsultantRepository } from '../../database/repositories/prisma-consultant.repository';
import { CreateConsultantUseCase } from '../../../application/use-cases/consultant/create-consultant.use-case';
import { GetConsultantsUseCase } from '../../../application/use-cases/consultant/get-consultants.use-case';
import { ConsultantController } from '../controllers/consultant.controller';

@Module({
  controllers: [ConsultantController],
  providers: [
    PrismaService,
    { provide: 'ConsultantRepository', useClass: PrismaConsultantRepository },
    {
      provide: CreateConsultantUseCase,
      inject: ['ConsultantRepository'],
      useFactory: (repo) => new CreateConsultantUseCase(repo),
    },
    {
      provide: GetConsultantsUseCase,
      inject: ['ConsultantRepository'],
      useFactory: (repo) => new GetConsultantsUseCase(repo),
    },
  ],
  exports: [CreateConsultantUseCase, GetConsultantsUseCase],
})
export class ConsultantModule {}