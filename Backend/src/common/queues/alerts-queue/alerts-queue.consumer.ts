import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Event } from 'src/models/events/schemas/events.schema';
import { OperatorsService } from 'src/models/operstors/operators.service';
import { format } from 'date-fns';
import { AlertsGateway } from 'src/common/gateways/alerts-gateway/alerts.gateway';
import { AlertsService } from 'src/models/alerts/alerts.service';
import { info } from 'winston';

@Processor('alerts-queue')
export class AlertsQueueConsumer {
  constructor(
    private readonly operatorsService: OperatorsService,
    private readonly alertsGateway: AlertsGateway,
    private readonly alertsService: AlertsService,
  ) {}
  @Process('alerts-job')
  async sendAlert(job: Job<unknown>) {
    //@ts-ignore
    const event: Event = job.data.event;
    const operator = await this.operatorsService.getOperator(
      event.personId + '',
    );
    const absentTime = format(new Date(event.eventTime), 'hh:mm a');
    const msg = `${operator.operatorName} left seat at ${absentTime}`;
    const alertEvent = new Event();
    alertEvent.pcId = event.pcId;
    alertEvent.personId = event.personId;
    alertEvent.presence = event.presence;
    alertEvent.distraction = event.distraction;
    alertEvent.emotion = event.emotion;
    alertEvent.eventDate = event.eventDate;
    alertEvent.eventTime = event.eventTime;
    alertEvent.owner = event.owner;
    const alert = await this.alertsService.createAlert(
      msg,
      alertEvent,
      operator._id + '',
      'a',
      alertEvent.owner + '',
      new Date().toISOString(),
    );
    // info(`Sending alert to ${alert.owner}`);
    this.alertsGateway.sendAbsentAlert(alert);
  }
}
