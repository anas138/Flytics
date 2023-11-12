import { Inject, Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { UpdateOperatorsStatsDto } from './dto/update-operators-stats.dto';
import { OperatorsStat } from './schemas/operators-stats.schema';

@Injectable()
export class OperatorsStatsRepository {
  constructor(
    @Inject('OPERATORSSTAT_MODEL')
    private readonly operatorsStatModel: Model<OperatorsStat>,
  ) {}

  async create(operatorsStat: OperatorsStat) {
    const newOperatorStat = new this.operatorsStatModel(operatorsStat);
    return newOperatorStat.save();
  }

  async find(operatorsStatFilterQuery: FilterQuery<OperatorsStat>) {
    return this.operatorsStatModel.find(operatorsStatFilterQuery);
  }

  async findOne(operatorsStatFilterQuery: FilterQuery<OperatorsStat>) {
    return this.operatorsStatModel.findOne(operatorsStatFilterQuery);
  }

  async findOneAndUpdate(
    operatorsStatFilterQuery: FilterQuery<OperatorsStat>,
    updateOperatorsStaDto: UpdateOperatorsStatsDto,
  ) {
    return this.operatorsStatModel.findOneAndUpdate(
      operatorsStatFilterQuery,
      updateOperatorsStaDto,
      {
        new: true,
      },
    );
  }
}
