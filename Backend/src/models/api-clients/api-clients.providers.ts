import { Connection } from 'mongoose';
import { ApiClientSchema } from './schemas/api-clients.schema';

export const apiClientProviders = [
  {
    provide: 'API_CLIENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('ApiClient', ApiClientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
