export class CreateAlertDto {
  message: string;
  event: Event;
  operator: string;
  alertType: string;
  owner: string;
  alertDate:string;
}
