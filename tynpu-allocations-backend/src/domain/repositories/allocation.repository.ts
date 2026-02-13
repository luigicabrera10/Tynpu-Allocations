import { Allocation } from '../entities/allocation.entity';

export interface AllocationRepository {
  save(allocation: Omit<Allocation, 'id'>): Promise<Allocation>;
  findOverlapping(
    consultantId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<Allocation | null>;
}