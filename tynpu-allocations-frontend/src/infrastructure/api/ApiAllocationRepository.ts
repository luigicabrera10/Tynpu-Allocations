const BASE_URL = "https://tynpu-allocations.onrender.com";

export class ApiAllocationRepository {
  async getAllocations() {
    try {
      const res = await fetch(`${BASE_URL}/allocations`);
      const data = await res.json();
      // Ensure we return an array. If the API wraps it, we extract it.
      return Array.isArray(data) ? data : (data.allocations || data.data || []);
    } catch (e) {
      console.error("Fetch error:", e);
      return [];
    }
    }

  async getConsultants() {
    const res = await fetch(`${BASE_URL}/consultants`);
    return res.json();
  }

  async getProjects() {
    const res = await fetch(`${BASE_URL}/projects`);
    return res.json();
  }

  async createAllocation(allocation: any) {
    const res = await fetch(`${BASE_URL}/allocations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allocation),
    });
    if (!res.ok) throw new Error("Conflict");
    return res.json();
  }
}

