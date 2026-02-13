import { Project } from '../../../domain/entities/project.entity';
import { ProjectRepository } from '../../../domain/repositories/project.repository';

export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(data: Omit<Project, 'id'>): Promise<Project> {
    return this.projectRepository.create(data);
  }
}