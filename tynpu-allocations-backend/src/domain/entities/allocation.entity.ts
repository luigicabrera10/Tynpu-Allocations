export class Allocation {
  constructor(
    public readonly id: string,
    public readonly consultantId: string,
    public readonly projectId: string,
    public readonly startTime: Date,
    public readonly endTime: Date,
  ) {
    if (this.startTime >= this.endTime) {
      throw new Error('Start time must be before end time');
    }
  }
}