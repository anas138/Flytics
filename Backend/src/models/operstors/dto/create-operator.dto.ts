import { ApiProperty } from '@nestjs/swagger';

export class CreateOperatorDto {
  machineId: string;
  clientId: string;
  operatorName: string;
  timeSlotStart: string;
  timeSlotEnd: string;
  timeZone: string;
  imageId: string;
  department: string;
}
