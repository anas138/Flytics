import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { AlertsController } from './alerts.controller';
import { alertsProviders } from './alerts.providers';
import { AlertsRepository } from './alerts.repository';
import { AlertsService } from './alerts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AlertsController],
  providers: [AlertsService, AlertsRepository, ...alertsProviders],
  exports: [AlertsService, AlertsRepository, ...alertsProviders],
})
export class AlertsModule {}
