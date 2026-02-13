import { Allocation } from '../../../domain/entities/allocation.entity';
import { AllocationRepository } from '../../../domain/repositories/allocation.repository';
import { CheckAllocationOverlapUseCase } from './check-allocation-overlap.use-case';

export class CreateAllocationUseCase {
  constructor(
    private readonly allocationRepository: AllocationRepository,
    private readonly checkOverlap: CheckAllocationOverlapUseCase
  ) {}

  async execute(data: Omit<Allocation, 'id'>): Promise<Allocation> {
    const hasOverlap = await this.checkOverlap.execute(
      data.consultantId,
      data.startTime,
      data.endTime
    );

    if (hasOverlap) {
      throw new Error('Consultant is already assigned to another project during this time range.');
    }

    return this.allocationRepository.save(data);
  }
}