import { Injectable } from '@nestjs/common';
import { Event } from '../events/schemas/events.schema';
import { AlertsRepository } from './alerts.repository';

@Injectable()
export class AlertsService {
  constructor(private readonly alertsRepository: AlertsRepository) {}

  async createAlert(
    message: string,
    event: Event,
    operator: string,
    alertType: string,
    owner: string,
    alertDate: string,
  ) {
    return this.alertsRepository.create({
      message,
      event,
      operator,
      alertType,
      owner,
      alertDate,
      isViewed: false,
    });
  }

  async getAlertsByApiClient(apiClientId: string, page, rows) {
    let pagination = { page: null, rows: null };
    if (page && rows) {
      const numberPage = parseInt(page);
      const numberRows = parseInt(rows);
      pagination = {
        page: numberPage,
        rows: numberRows,
      };
    }
    return this.alertsRepository.find(
      { owner: apiClientId },
      pagination.page,
      pagination.rows,
    );
  }

  async getAlertsByOperator(operatorId: string) {
    return this.alertsRepository.find({ operator: operatorId });
  }

  async markAlertViewed(alertId: string) {
    return this.alertsRepository.findOneAndUpdate(
      { _id: alertId },
      { isViewed: true },
    );
  }
}
