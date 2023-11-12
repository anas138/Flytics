import { Inject, Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { Operator } from './schemas/operators.schema';

@Injectable()
export class OperatorsRepository {
  constructor(
    @Inject('OPERATORS_MODEL') private readonly operatorsModel: Model<Operator>,
  ) {}

  async create(operator: Operator) {
    const newOperator = new this.operatorsModel(operator);
    return newOperator.save();
  }

  async findOne(operatorFilterQuery: FilterQuery<Operator>) {
    return this.operatorsModel
      .findOne(operatorFilterQuery)
      .populate('department');
  }

  async find(operatorFilterQuery: FilterQuery<Operator>, page = 0, rows = 100) {
    if (page === -1 && rows === -1) {
      const count = await this.operatorsModel.count(operatorFilterQuery);
      const arrayResult = await this.operatorsModel
      .find(operatorFilterQuery)
      .populate('department')
    return {
      result: [...arrayResult],
      count,
    };
    }
    const count = await this.operatorsModel.count(operatorFilterQuery);
    const arrayResult = await this.operatorsModel
      .find(operatorFilterQuery)
      .populate('department')
      .skip(page * rows)
      .limit(rows);
    return {
      result: [...arrayResult],
      count,
    };
  }

  async findOneAndUpdate(
    operatorFilterQuery: FilterQuery<Operator>,
    operator: Partial<Operator>,
  ) {
    return this.operatorsModel
      .findOneAndUpdate(operatorFilterQuery, operator, {
        new: true,
      })
      .populate('department');
  }

  // async getOperatorAggregation(operatorFilterQuery: FilterQuery<Operator>){
  //   const data = this.operatorsModel.findOne
  // }
}
