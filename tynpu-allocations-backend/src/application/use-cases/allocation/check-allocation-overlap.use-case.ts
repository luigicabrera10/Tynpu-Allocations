import { AllocationRepository } from '../../../domain/repositories/allocation.repository';

export class CheckAllocationOverlapUseCase {
  constructor(private readonly allocationRepository: AllocationRepository) {}

  async execute(consultantId: string, startTime: Date, endTime: Date): Promise<boolean> {
    const overlapping = await this.allocationRepository.findOverlapping(
      consultantId,
      startTime,
      endTime
    );
    return !!overlapping;
  }
}