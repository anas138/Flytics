import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { DepartmentsModule } from '../departments/departments.module';
import { EventsModule } from '../events/events.module';
import { OperatorsStatsModule } from '../operators-stats/operators-stats.module';
import { OperatorsController } from './operators.controller';
import { operatorsProviders } from './operators.providers';
import { OperatorsRepository } from './operators.repository';
import { OperatorsService } from './operators.service';
import { ImageServiceModule } from './utils/image-service/image-service.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    forwardRef(() => EventsModule),
    OperatorsStatsModule,
    ImageServiceModule,
    DepartmentsModule,
  ],
  controllers: [OperatorsController],
  providers: [OperatorsService, OperatorsRepository, ...operatorsProviders],
  exports: [OperatorsService, OperatorsRepository, ...operatorsProviders],
})
export class OperatorsModule {}
