import { Connection } from 'mongoose';
import { TeamSchema } from './schemas/teams.schema';

export const teamsProviders = [
  {
    provide: 'TEAMS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Team', TeamSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];