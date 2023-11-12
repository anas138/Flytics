import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { AlertsGateway } from 'src/common/gateways/alerts-gateway/alerts.gateway';
import { CreateEventDto } from 'src/models/events/dto/create-event.dto';
import { CreateOperatorStatDto } from 'src/models/operators-stats/dto/create-operators-stat.dto';
import { UpdateOperatorsStatsDto } from 'src/models/operators-stats/dto/update-operators-stats.dto';
import { OperatorsStatsService } from 'src/models/operators-stats/operators-stats.service';
import { OperatorsService } from 'src/models/operstors/operators.service';
import * as winston from 'winston';

@Processor('stats-calculation-queue')
export class StatsCalculationConsumer {
  constructor(
    @Inject(OperatorsStatsService)
    private readonly operatorStatsService: OperatorsStatsService,
    private readonly operatorsService: OperatorsService,
    @InjectQueue('alerts-queue') private queue: Queue,
    private readonly alertsGateway: AlertsGateway,
  ) {}

  isPresenceEvent(eventDto: CreateEventDto) {
    return eventDto.presence === 1 && eventDto.distraction === 0;
  }

  isDistractionEvent(eventDto: CreateEventDto) {
    return eventDto.presence === 1 && eventDto.distraction === 1;
  }

  @Process('stats-calculation-job')
  async calculateStatsJob(job: Job<unknown>) {
    //@ts-ignore
    if (job.data?.createEventDto) {
      // winston.debug('Job received for an event');
      //@ts-ignore
      const dto = job.data.createEventDto;
      const today = new Date();
      const todayDate = `${
        today.toISOString().split('T')[0]
      }T00:00:00.000+00:00`;
      const operatorStat =
        await this.operatorStatsService.findOperatorsStatForOperatorByDate(
          dto.personId,
          todayDate,
        );
      if (operatorStat) {
        const updateStatDto = new UpdateOperatorsStatsDto();
        if (this.isPresenceEvent(dto)) {
          switch (operatorStat.lastEvent) {
            case 'a': {
              updateStatDto.lastEvent = 'p';
              updateStatDto.lastPresenceEvent = dto.eventTime;
              updateStatDto.lastDistractionEvent = dto.eventTime;
              this.alertsGateway.sendPresenceAlert({
                event: dto,
                owner: dto.owner,
              });
              break;
            }
            case 'p': {
              break;
            }
            case 'd': {
              if (operatorStat.distractionTime === 0) {
                const difference =
                  new Date(operatorStat.lastDistractionEvent).getTime() -
                  new Date(dto.eventTime).getTime();
                const newDistractionTime =
                  operatorStat.distractionTime + Math.abs(difference);
                updateStatDto.distractionTime = newDistractionTime;
                const newPresenceTime =
                  operatorStat.presenceTime + Math.abs(difference);
                updateStatDto.presenceTime = newPresenceTime;
                updateStatDto.lastEvent = 'p';
                updateStatDto.lastPresenceEvent = dto.eventTime;
                // winston.debug('Incremented Distraction time');
                break;
              }
              const difference =
                new Date(operatorStat.lastDistractionEvent).getTime() -
                new Date(dto.eventTime).getTime();
              const newDistractionTime =
                operatorStat.distractionTime + Math.abs(difference);
              updateStatDto.distractionTime = newDistractionTime;
              const newPresenceTime =
                operatorStat.presenceTime + Math.abs(difference);
              updateStatDto.presenceTime = newPresenceTime;
              updateStatDto.lastEvent = 'p';
              updateStatDto.lastPresenceEvent = dto.eventTime;
              break;
            }
          }
        } else if (this.isDistractionEvent(dto)) {
          switch (operatorStat.lastEvent) {
            case 'a': {
              updateStatDto.lastEvent = 'd';
              updateStatDto.lastPresenceEvent = dto.eventTime;
              updateStatDto.lastDistractionEvent = dto.eventTime;
              break;
            }
            case 'p': {
              if (operatorStat.presenceTime === 0) {
                const difference =
                  new Date(operatorStat.lastPresenceEvent).getTime() -
                  new Date(dto.eventTime).getTime();
                const newPresenceTime =
                  operatorStat.presenceTime + Math.abs(difference);
                updateStatDto.presenceTime = newPresenceTime;
                updateStatDto.lastEvent = 'd';
                updateStatDto.lastDistractionEvent = dto.eventTime;
                // winston.debug('Incremented Presence time');
                break;
              }
              const difference =
                new Date(operatorStat.lastPresenceEvent).getTime() -
                new Date(dto.eventTime).getTime();
              const newPresenceTime =
                operatorStat.presenceTime + Math.abs(difference);
              updateStatDto.presenceTime = newPresenceTime;
              updateStatDto.lastEvent = 'd';
              updateStatDto.lastDistractionEvent = dto.eventTime;
              break;
            }
            case 'd': {
              break;
            }
          }
        } else {
          if (operatorStat.lastEvent !== 'a')
            await this.queue.add('alerts-job', {
              event: dto,
            });
          switch (operatorStat.lastEvent) {
            case 'p': {
              const difference =
                new Date(operatorStat.lastPresenceEvent).getTime() -
                new Date(dto.eventTime).getTime();
              const newPresenceTime =
                operatorStat.presenceTime + Math.abs(difference);
              updateStatDto.presenceTime = newPresenceTime;
              updateStatDto.lastEvent = 'a';
              updateStatDto.lastDistractionEvent = dto.eventTime;
              updateStatDto.lastPresenceEvent = dto.eventTime;
              // winston.debug('Incremented Presence time');
              break;
            }
            case 'd': {
              const difference =
                new Date(operatorStat.lastDistractionEvent).getTime() -
                new Date(dto.eventTime).getTime();
              const newDistractionTime =
                operatorStat.distractionTime + Math.abs(difference);
              updateStatDto.distractionTime = newDistractionTime;
              const newPresenceTime =
                operatorStat.presenceTime + Math.abs(difference);
              updateStatDto.presenceTime = newPresenceTime;
              // updateStatDto.lastEvent = 'p';
              updateStatDto.lastPresenceEvent = dto.eventTime;
              updateStatDto.lastEvent = 'a';
              updateStatDto.lastDistractionEvent = dto.eventTime;
              // winston.debug('Incremented Distraction time');
              break;
            }
          }
          // winston.info('Alert for absence event');
        }
        await this.operatorStatsService.updateOperatorsStat(
          operatorStat._id,
          updateStatDto,
        );
      } else {
        // winston.debug('Logging in the operator');
        if (dto.presence !== 1) return;
        const operator = await this.operatorsService.getOperator(dto.personId);
        if (!operator) {
          winston.error('No operator could be found with id ' + dto.personId);
          return;
        }
        const createStatDto = new CreateOperatorStatDto();
        createStatDto.statsDate = todayDate;
        createStatDto.personId = operator._id + '';
        createStatDto.loginTime = dto.eventTime;
        createStatDto.timeSlotStart = operator.timeSlotStart;
        createStatDto.timeSlotEnd = operator.timeSlotEnd;
        createStatDto.presenceTime = 0;
        createStatDto.distractionTime = 0;
        if (this.isPresenceEvent(dto)) createStatDto.lastEvent = 'p';
        else if (this.isDistractionEvent(dto)) createStatDto.lastEvent = 'd';
        else createStatDto.lastEvent = 'd';
        createStatDto.lastPresenceEvent = dto.eventTime;
        createStatDto.lastDistractionEvent = dto.eventTime;
        await this.operatorStatsService.createOperatorsStat(
          createStatDto.timeSlotStart,
          createStatDto.timeSlotEnd,
          createStatDto.statsDate,
          createStatDto.loginTime,
          createStatDto.presenceTime,
          createStatDto.distractionTime,
          createStatDto.lastPresenceEvent,
          createStatDto.lastDistractionEvent,
          createStatDto.lastEvent,
          createStatDto.personId,
        );
      }
      this.alertsGateway.sendStatsChangeAlert({ ...dto });
    }
  }
}
