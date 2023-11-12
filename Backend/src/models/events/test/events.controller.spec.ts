import { Test } from '@nestjs/testing';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventsController } from '../events.controller';
import { EventsService } from '../events.service';
import { Event } from '../schemas/events.schema';
import { eventStub } from './stubs/events.stub';

jest.mock('../events.service');

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    eventsController = moduleRef.get<EventsController>(EventsController);
    eventsService = moduleRef.get<EventsService>(EventsService);
    jest.clearAllMocks();
  });

  describe('createEvent', () => {
    describe('when createEvent is called', () => {
      let event: Event;
      let createEventDto;
      CreateEventDto;

      beforeEach(async () => {
        createEventDto = {
          pcId: eventStub().pcId,
          eventDate: eventStub().eventDate,
          eventTime: eventStub().eventTime,
          personId: eventStub().personId,
          presence: eventStub().presence,
          distraction: eventStub().distraction,
          emotion: eventStub().emotion,
          owner: eventStub().owner,
        };
        event = await eventsController.createEvent(createEventDto, {
          id: createEventDto.owner,
        });
      });

      test('then it should call eventsService', () => {
        expect(eventsService.createEvent).toHaveBeenCalled();
      });

      test('then it should return event', () => {
        expect(event).toEqual(eventStub());
      });
    });
  });

  describe('getEvents', () => {
    describe('when getEvents is called', () => {
      let events: Event[];

      beforeEach(async () => {
        events = await eventsController.getEvents();
      });

      test('then it should call eventsService', () => {
        expect(eventsService.getEvents).toHaveBeenCalled();
      });

      test('then it should return events', () => {
        expect(events).toEqual([eventStub()]);
      });
    });
  });
});
