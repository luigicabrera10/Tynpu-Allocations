import { ProjectRepository } from '../../../domain/repositories/project.repository';

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.projectRepository.findAll(skip, limit);
  }
}