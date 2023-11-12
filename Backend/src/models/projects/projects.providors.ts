import { Connection } from 'mongoose';
import { ProjectSchema } from './schemas/projects.schema';

export const projectsProviders = [
  {
    provide: 'PROJECTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Project', ProjectSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
