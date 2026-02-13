import { Consultant } from '../../../domain/entities/consultant.entity';
import { ConsultantRepository } from '../../../domain/repositories/consultant.repository';

export class CreateConsultantUseCase {
  constructor(private readonly consultantRepository: ConsultantRepository) {}

  async execute(data: Omit<Consultant, 'id'>): Promise<Consultant> {
    return this.consultantRepository.create(data);
  }
}