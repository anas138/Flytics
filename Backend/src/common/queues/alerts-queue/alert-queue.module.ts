import { Module } from '@nestjs/common';
import { AlertsGateway } from 'src/common/gateways/alerts-gateway/alerts.gateway';
import { AlertsModule } from 'src/models/alerts/alerts.module';
import { OperatorsModule } from 'src/models/operstors/operators.module';
import { AlertsQueueConsumer } from './alerts-queue.consumer';

@Module({
  imports: [OperatorsModule, AlertsModule],
  providers: [AlertsQueueConsumer, AlertsGateway],
  exports: [AlertsQueueConsumer],
})
export class AlertQueueModule {}
