import { ConsultantRepository } from '../../../domain/repositories/consultant.repository';

export class GetConsultantsUseCase {
  constructor(private readonly consultantRepository: ConsultantRepository) {}

  async execute(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.consultantRepository.findAll(skip, limit);
  }
}