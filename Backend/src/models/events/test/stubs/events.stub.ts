import { Event } from '../../schemas/events.schema';

export const eventStub = (): Event => {
  return {
    pcId: 'string pc id',
    eventDate: new Date('2022-05-09T00:00:00.000Z'),
    eventTime: '16:52:00',
    personId: '62873adbfb897eead2cf63f7',
    presence: 1,
    distraction: 0,
    emotion: 'Present',
    owner:'62861f36d90dc52a2e850b93'
  };
};
