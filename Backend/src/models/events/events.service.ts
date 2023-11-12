import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { OperatorsService } from '../operstors/operators.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsRepository } from './events.repository';
import * as dateFns from 'date-fns';
import {
  convertLocalTimeToUTC,
  convertUTCToLocal,
  getUTCDate,
} from 'src/common/utils/misc-functions';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly operatorsService: OperatorsService,
    @InjectQueue('stats-calculation-queue') private queue: Queue,
  ) {}

  async getEvents() {
    return this.eventsRepository.find({});
  }

  async getEventsByPersonId(personId: string, filters) {
    const filterOption =
      filters.dateFrom && filters.dateTo
        ? {
            $and: [
              { personId },
              { eventDate: { $gte: filters.dateFrom, $lte: filters.dateTo } },
            ],
          }
        : { personId };
    return this.eventsRepository.find(filterOption);
  }

  async getEventsByOwnerId(ownerId: string) {
    return this.eventsRepository.find({ owner: ownerId });
  }

  getOperatorByTimeSlot(operators) {
    const today = new Date(new Date().toISOString());
    const todayString = today.toISOString().split('T')[0];
    const todayTime = dateFns.format(new Date(), 'HH:mm');
    const todayTimeUTC = convertLocalTimeToUTC(todayTime);
    // console.log('todayTime', todayTime);
    // console.log('todayTimeUTC', todayTimeUTC);
    // const currentTime = dateFns.getUnixTime(today);

    const currentTime = today.getTime();
    for (const operator of operators) {
      // const slotStartUtcTime = convertLocalTimeToUTC(operator.timeSlotStart);
      // const slotEndUtcTime = convertLocalTimeToUTC(operator.timeSlotEnd);
      // const slotStartTimeToLocal = convertUTCToLocal(operator.timeSlotStart);
      // const slotEndTimeToLocal = convertUTCToLocal(operator.timeSlotEnd);
      const slotStart = new Date(
        todayString + 'T' + operator.timeSlotStart + 'Z',
      );
      const slotEnd = new Date(todayString + 'T' + operator.timeSlotEnd + 'Z');

      // console.log('TimeSlotStart', operator.timeSlotStart);
      // console.log('TimeSlotEnd', operator.timeSlotEnd);
      // console.log('slotStart', slotStart);
      // console.log('slotEnd', slotEnd);
      // console.log('slotStart.getTime()', slotStart.getTime());
      // console.log('slotStart.getTime()', slotStart.getTime());
      // console.log('slotEnd.getTime()', slotEnd.getTime());
      // console.log('currentTime', currentTime);
      // console.log(
      //   'slotStart.getTime() <= currentTime && slotEnd.getTime() >= currentTime',
      //   slotStart.getTime() <= currentTime && slotEnd.getTime() >= currentTime,
      // );
      if (
        slotStart.getTime() <= currentTime &&
        slotEnd.getTime() >= currentTime
      )
        return operator;
    }
  }

  async createEvent(createEventDto: CreateEventDto) {
    const person = createEventDto.personId;
    if (person === 'Not Found') {
      createEventDto.distraction = 1;
      createEventDto.presence = 0;
    }
    const operators = await this.operatorsService.getOperatorsByMachine(
      createEventDto.pcId,
    );
    const currentOperator = this.getOperatorByTimeSlot([...operators.result]);
    if (!currentOperator)
      throw new BadRequestException(
        'No operator for current machine at current time registered.',
      );
    createEventDto.personId = currentOperator._id;
    await this.queue.add('stats-calculation-job', { createEventDto });
    // return 'queue added.';
    return this.eventsRepository.create({
      ...createEventDto,
    });
  }
}
