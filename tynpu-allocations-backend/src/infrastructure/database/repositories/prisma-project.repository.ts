import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectRepository } from '../../../domain/repositories/project.repository';
import { Project } from '../../../domain/entities/project.entity';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Project, 'id'>): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async findAll(skip: number, take: number): Promise<Project[]> {
    return this.prisma.project.findMany({ skip, take });
  }

  async findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } });
  }
}