import { Injectable } from '@nestjs/common';
import { UpdateOperatorsStatsDto } from './dto/update-operators-stats.dto';
import { OperatorsStatsRepository } from './operators-stats.repositor';

@Injectable()
export class OperatorsStatsService {
  constructor(
    private readonly operatorsStatRepository: OperatorsStatsRepository,
  ) {}

  async createOperatorsStat(
    timeSlotStart: string,
    timeSlotEnd: string,
    statsDate: string,
    loginTime: string,
    presenceTime: number,
    distractionTime: number,
    lastPresenceEvent: string,
    lastDistractionEvent: string,
    lastEvent: string,
    personId: string,
  ) {
    return this.operatorsStatRepository.create({
      timeSlotStart,
      timeSlotEnd,
      statsDate,
      loginTime,
      presenceTime,
      distractionTime,
      lastPresenceEvent,
      lastDistractionEvent,
      lastEvent,
      personId,
    });
  }

  async findOperatorsStat() {
    return this.operatorsStatRepository.find({});
  }

  async findOperatorsStatByOperatorId(operatorId: string) {
    return this.operatorsStatRepository.find({ personId: operatorId });
  }

  async findOperatorsStatForOperatorByDate(
    operatorId: string,
    statDate: string,
  ) {
    return this.operatorsStatRepository.findOne({
      $and: [{ personId: operatorId }, { statsDate: statDate }],
    });
  }

  async findOperatorsStatForOperatorByDateRange(
    operatorId: string,
    startDate: string,
    endDate: string,
  ) {
    return this.operatorsStatRepository.find({
      $and: [
        { personId: operatorId },
        { statsDate: { $gte: startDate, $lte: endDate } },
      ],
    });
  }

  async updateOperatorsStat(
    statId,
    updateOperatorStatDto: UpdateOperatorsStatsDto,
  ) {
    return this.operatorsStatRepository.findOneAndUpdate(
      {
        _id: statId,
      },
      updateOperatorStatDto,
    );
  }
}
