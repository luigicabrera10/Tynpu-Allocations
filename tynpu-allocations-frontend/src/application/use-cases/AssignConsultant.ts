import { IAllocationRepository } from "../../domain/repositories/IAllocationRepository";
import { Allocation } from "../../domain/entities/Allocation";

export class AssignConsultant {
  constructor(private repository: IAllocationRepository) {}

  async execute(newAlloc: Omit<Allocation, 'id'>): Promise<Allocation> {
    const existing = await this.repository.getAllocations();

    // Business Rule: Check for schedule overlaps
    const hasOverlap = existing.some(a => 
      a.consultantId === newAlloc.consultantId &&
      new Date(newAlloc.startTime) < new Date(a.endTime) &&
      new Date(newAlloc.endTime) > new Date(a.startTime)
    );

    if (hasOverlap) {
      throw new Error("Consultant is already assigned during this time slot.");
    }

    return await this.repository.createAllocation(newAlloc);
  }
}