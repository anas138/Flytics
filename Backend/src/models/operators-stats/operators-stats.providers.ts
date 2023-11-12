import { Connection } from 'mongoose';
import { OperatorsStatSchema } from './schemas/operators-stats.schema';

export const operatorsStatsProviders = [
  {
    provide: 'OPERATORSSTAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('OperatorStat', OperatorsStatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
