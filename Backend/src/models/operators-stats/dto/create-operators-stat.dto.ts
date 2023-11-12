import { Operator } from 'src/models/operstors/schemas/operators.schema';

export class CreateOperatorStatDto {
  timeSlotStart: string;
  timeSlotEnd: string;
  statsDate: string;
  loginTime: string;
  presenceTime: number;
  distractionTime: number;
  lastPresenceEvent: string;
  lastDistractionEvent: string;
  lastEvent: string;
  personId: Operator | string;
}
