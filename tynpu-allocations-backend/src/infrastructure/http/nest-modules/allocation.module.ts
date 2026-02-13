import { Module } from '@nestjs/common';
import { AllocationController } from '../controllers/allocation.controller';
import { CreateAllocationUseCase } from '../../../application/use-cases/allocation/create-allocation.use-case';
import { CheckAllocationOverlapUseCase } from '../../../application/use-cases/allocation/check-allocation-overlap.use-case';
import { PrismaAllocationRepository } from '../../database/repositories/prisma-allocation.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

@Module({
  controllers: [AllocationController],
  providers: [
    PrismaService,
    {
      provide: 'AllocationRepository',
      useClass: PrismaAllocationRepository,
    },
    {
      provide: CheckAllocationOverlapUseCase,
      inject: ['AllocationRepository'],
      useFactory: (repo) => new CheckAllocationOverlapUseCase(repo),
    },
    {
      provide: CreateAllocationUseCase,
      inject: ['AllocationRepository', CheckAllocationOverlapUseCase],
      useFactory: (repo, check) => new CreateAllocationUseCase(repo, check),
    },
  ],
})
export class AllocationModule {}