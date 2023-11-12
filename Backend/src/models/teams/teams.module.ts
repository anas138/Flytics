import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { ProjectsModule } from '../projects/projects.module';
import { TeamsController } from './teams.controller';
import { teamsProviders } from './teams.providers';
import { TeamsRepository } from './teams.repository';
import { TeamsService } from './teams.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TeamsController],
  providers: [TeamsRepository, TeamsService, ...teamsProviders],
})
export class TeamsModule {}
