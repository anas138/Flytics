import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AlertsGateway } from 'src/common/gateways/alerts-gateway/alerts.gateway';
import { OperatorsStatsModule } from 'src/models/operators-stats/operators-stats.module';
import { OperatorsModule } from 'src/models/operstors/operators.module';
import { StatsCalculationConsumer } from './stats-calculation.consumer';

@Module({
  imports: [
    OperatorsStatsModule,
    OperatorsModule,
    BullModule.registerQueue({
      name: 'alerts-queue',
    }),
  ],
  providers: [StatsCalculationConsumer, AlertsGateway],
  exports: [StatsCalculationConsumer],
})
export class StatsCalculationQueueModule {}
