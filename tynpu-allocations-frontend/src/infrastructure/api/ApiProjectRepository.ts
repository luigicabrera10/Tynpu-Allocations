import { Project } from "../../domain/entities/Project";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://tynpu-allocations.onrender.com";

export class ApiProjectRepository {
  async getProjects(page: number): Promise<Project[]> {
    const res = await fetch(`${BASE_URL}/projects?page=${page}`);
    return res.json();
  }

  async createProject(data: any): Promise<Project> {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}