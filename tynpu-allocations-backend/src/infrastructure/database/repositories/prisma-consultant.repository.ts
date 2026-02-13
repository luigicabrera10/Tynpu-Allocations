import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConsultantRepository } from '../../../domain/repositories/consultant.repository';
import { Consultant } from '../../../domain/entities/consultant.entity';

@Injectable()
export class PrismaConsultantRepository implements ConsultantRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Consultant, 'id'>): Promise<Consultant> {
    return this.prisma.consultant.create({ data });
  }

  async findAll(skip: number, take: number): Promise<Consultant[]> {
    return this.prisma.consultant.findMany({ skip, take });
  }

  async findById(id: string): Promise<Consultant | null> {
    return this.prisma.consultant.findUnique({ where: { id } });
  }
}