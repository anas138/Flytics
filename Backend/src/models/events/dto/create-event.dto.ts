export class CreateEventDto {
  pcId: string;
  eventDate: Date;
  eventTime: string;
  personId: string;
  presence: Number;
  distraction: Number;
  emotion: string;
  owner: string;
}
