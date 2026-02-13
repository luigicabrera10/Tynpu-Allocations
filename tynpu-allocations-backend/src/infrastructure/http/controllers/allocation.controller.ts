import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { CreateAllocationUseCase } from '../../../application/use-cases/allocation/create-allocation.use-case';
import { CreateAllocationDto } from '../../../application/dtos/allocation.dto';

@Controller('allocations')
export class AllocationController {
  constructor(private readonly createAllocation: CreateAllocationUseCase) {}

  @Post()
  async create(@Body() dto: CreateAllocationDto) {
    try {
      return await this.createAllocation.execute({
        ...dto,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}