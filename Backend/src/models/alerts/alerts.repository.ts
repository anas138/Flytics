import { Inject, Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './schemas/alerts.schema';

@Injectable()
export class AlertsRepository {
  constructor(
    @Inject('ALERT_MODEL') private readonly alertsModel: Model<Alert>,
  ) {}

  async create(alert: Alert) {
    const newAlert = new this.alertsModel(alert);
    return await newAlert.save();
  }

  async find(alertFilterQuery: FilterQuery<Alert>, page = 0, rows = 100) {
    const count = await this.alertsModel.count(alertFilterQuery);
    const arrayResult = await this.alertsModel
      .find(alertFilterQuery)
      .sort({ alertDate: -1 })
      .populate('operator')
      // .populate('owner')
      .skip(page * rows)
      .limit(rows);
    return {
      result: [...arrayResult],
      count,
    };
  }

  async findOne(alertFilterQuery: FilterQuery<Alert>) {
    return this.alertsModel.findOne(alertFilterQuery);
  }

  async findOneAndUpdate(
    alertFilterQuery: FilterQuery<Alert>,
    updateAlertDto: UpdateAlertDto,
  ) {
    return this.alertsModel
      .findOneAndUpdate(alertFilterQuery, updateAlertDto, {
        new: true,
      })
      .populate('operator');
  }
}
