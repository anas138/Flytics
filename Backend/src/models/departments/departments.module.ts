import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { DepartmentsController } from './departments.controller';
import { departmentsProviders } from './departments.providers';
import { DepartmentsRepository } from './departments.repository';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    DepartmentsRepository,
    ...departmentsProviders,
  ],
  exports: [DepartmentsService, DepartmentsRepository, ...departmentsProviders],
})
export class DepartmentsModule {}
