import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { operatorsStatsController } from './operators-stats.controller';
import { operatorsStatsProviders } from './operators-stats.providers';
import { OperatorsStatsRepository } from './operators-stats.repositor';
import { OperatorsStatsService } from './operators-stats.service';

@Module({
  imports: [DatabaseModule],
  controllers: [operatorsStatsController],
  providers: [
    OperatorsStatsService,
    OperatorsStatsRepository,
    ...operatorsStatsProviders,
  ],
  exports: [
    OperatorsStatsService,
    OperatorsStatsRepository,
    ...operatorsStatsProviders,
  ],
})
export class OperatorsStatsModule {}
