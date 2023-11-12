import { Controller, Get, Param, Patch, Query, Req } from '@nestjs/common';
import { ApiHeaders, ApiQuery } from '@nestjs/swagger';
import { AlertsService } from './alerts.service';

@ApiHeaders([{ name: 'x-auth-api-key' }, { name: 'x-auth-api-secret' }])
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @ApiQuery({
    name: 'page',
    type: 'int',
    description: 'Pagination page; default = 0',
  })
  @ApiQuery({
    name: 'rows',
    type: 'int',
    description: 'Pagination rows per page; default = 100',
  })
  @Get()
  async getAlertsForApiClient(
    @Req() req,
    @Query('page') page,
    @Query('rows') rows,
  ) {
    const apiClient = req.decoded;
    return this.alertsService.getAlertsByApiClient(apiClient.id, page, rows);
  }

  @Patch(':id/mark-viewed')
  async markAlertAsViewed(@Param('id') alertId: string) {
    return this.alertsService.markAlertViewed(alertId);
  }
}
