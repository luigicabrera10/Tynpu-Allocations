import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AllocationRepository } from '../../../domain/repositories/allocation.repository';
import { Allocation } from '../../../domain/entities/allocation.entity';

@Injectable()
export class PrismaAllocationRepository implements AllocationRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: Omit<Allocation, 'id'>): Promise<Allocation> {
    return this.prisma.allocation.create({ data });
  }

  async findOverlapping(consultantId: string, startTime: Date, endTime: Date): Promise<Allocation | null> {
    return this.prisma.allocation.findFirst({
      where: {
        consultantId,
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } },
        ],
      },
    });
  }
}