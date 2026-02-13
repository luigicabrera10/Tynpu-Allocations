import { IAllocationRepository } from "../../domain/repositories/IAllocationRepository";

export class GetConsultants {
  constructor(private repository: IAllocationRepository) {}

  async execute(page: number) {
    return await this.repository.getConsultants(page);
  }
}