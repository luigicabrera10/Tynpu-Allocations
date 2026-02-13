import { Consultant } from "../entities/Consultant";
import { Project } from "../entities/Project";
import { Allocation } from "../entities/Allocation";

export interface IAllocationRepository {
  getConsultants(page: number): Promise<Consultant[]>;
  getProjects(page: number): Promise<Project[]>;
  getAllocations(): Promise<Allocation[]>;
  createAllocation(allocation: Omit<Allocation, 'id'>): Promise<Allocation>;
}