import { Connection } from 'mongoose';
import { DepartmentSchema } from './schemas/departments.schema';

export const departmentsProviders = [
  {
    provide: 'DEPARTMENTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Department', DepartmentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
