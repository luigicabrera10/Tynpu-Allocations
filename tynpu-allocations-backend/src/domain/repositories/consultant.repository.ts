import { Consultant } from '../entities/consultant.entity';

export interface ConsultantRepository {
  create(consultant: Omit<Consultant, 'id'>): Promise<Consultant>;
  findAll(skip: number, take: number): Promise<Consultant[]>;
  findById(id: string): Promise<Consultant | null>;
}