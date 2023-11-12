import { Connection } from 'mongoose';
import { OperatorSchema } from './schemas/operators.schema';

export const operatorsProviders = [
  {
    provide: 'OPERATORS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Operator', OperatorSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
