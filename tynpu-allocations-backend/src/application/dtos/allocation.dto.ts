import { IsString, IsISO8601, IsUUID } from 'class-validator';

export class CreateAllocationDto {
  @IsUUID()
  consultantId: string;

  @IsUUID()
  projectId: string;

  @IsISO8601()
  startTime: string;

  @IsISO8601()
  endTime: string;
}