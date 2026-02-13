import { Project } from '../entities/project.entity';

export interface ProjectRepository {
  create(project: Omit<Project, 'id'>): Promise<Project>;
  findAll(skip: number, take: number): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
}