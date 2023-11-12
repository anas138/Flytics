import { AlertSchema } from './schemas/alerts.schema';
import { Connection } from 'mongoose';

export const alertsProviders = [
  {
    provide: 'ALERT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Alert', AlertSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
