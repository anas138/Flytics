import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { TeamsModule } from '../teams/teams.module';
import { ProjectsController } from './projects.controller';
import { projectsProviders } from './projects.providors';
import { ProjectsRepository } from './projects.repository';
import { ProjectsService } from './projects.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectsRepository, ProjectsService, ...projectsProviders],
})
export class ProjectsModule {}
