export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null, // Change this to null to match Prisma
  ) {}
}