import { Inject, Injectable } from '@nestjs/common';
import { Event } from './schemas/events.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class EventsRepository {
  constructor(
    @Inject('EVENTS_MODEL') private readonly eventsModel: Model<Event>,
  ) {}

  async create(event: Event) {
    const newEvent = new this.eventsModel(event);
    return newEvent.save();
  }

  async find(eventsFilterQuery: FilterQuery<Event>) {
    return this.eventsModel.find(eventsFilterQuery);
  }
}
