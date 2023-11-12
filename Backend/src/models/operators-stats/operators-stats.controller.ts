import { Controller } from '@nestjs/common';
import { OperatorsStatsService } from './operators-stats.service';

@Controller()
export class operatorsStatsController {
  constructor(private readonly operatorsStatsService: OperatorsStatsService) {}

  async getOperatorsStats() {}
}
