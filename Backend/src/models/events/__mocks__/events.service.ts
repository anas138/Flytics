import { eventStub } from '../test/stubs/events.stub';

export const EventsService = jest.fn().mockReturnValue({
  getEvents: jest.fn().mockReturnValue([eventStub()]),
  createEvent: jest.fn().mockReturnValue(eventStub()),
});
