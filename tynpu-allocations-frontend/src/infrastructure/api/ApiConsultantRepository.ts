import { Consultant } from "../../domain/entities/Consultant";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://tynpu-allocations.onrender.com";

export class ApiConsultantRepository {
  async getConsultants(page: number): Promise<Consultant[]> {
    const res = await fetch(`${BASE_URL}/consultants?page=${page}`);
    return res.json();
  }

  async createConsultant(data: any): Promise<Consultant> {
    const res = await fetch(`${BASE_URL}/consultants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}