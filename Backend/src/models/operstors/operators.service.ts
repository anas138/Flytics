import {
  BadRequestException,
  ConflictException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiClient } from '../api-clients/schemas/api-clients.schema';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorsRepository } from './operators.repository';
import { EventsService } from '../events/events.service';
import {
  generateFilterObject,
  calculateOperatorStats,
} from './utils/function-serverice';
import { OperatorsStatsService } from '../operators-stats/operators-stats.service';
import { ImageService } from './utils/image-service/image-service';
import { zonedTimeToUtc } from 'date-fns-tz';
import { DepartmentsService } from '../departments/departments.service';
import { json2csvAsync } from 'json-2-csv';
import { fixFloat, formatTime } from 'src/common/utils/misc-functions';
@Injectable()
export class OperatorsService {
  constructor(
    private readonly operatorsRepository: OperatorsRepository,
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly operatorsStatsService: OperatorsStatsService,
    private readonly imageService: ImageService,
    private readonly departmentsService: DepartmentsService,
  ) {}

  async createOperator(
    machineId: string,
    clientId: string,
    operatorName: string,
    timeSlotStart: string,
    timeSlotEnd: string,
    timeZone: string,
    department: string,
    image: Express.Multer.File,
  ) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const slotStartUtc = zonedTimeToUtc(
      new Date(`${todayString}T${timeSlotStart}`),
      timeZone,
    )
      .toISOString()
      .slice(11, 16);
    const slotEndUtc = zonedTimeToUtc(
      new Date(`${todayString}T${timeSlotEnd}`),
      timeZone,
    )
      .toISOString()
      .slice(11, 16);
    const operator = await this.operatorsRepository.findOne({
      $and: [
        {
          machineId,
        },
        {
          timeSlotStart: slotStartUtc,
        },
        {
          timeSlotEnd: slotEndUtc,
        },
        {
          timeZone,
        },
      ],
    });

    if (operator)
      throw new ConflictException(
        'An operator is already registered in given time slot on provided machine.',
      );
    else {
      // console.log('dto', {
      //   machineId,
      //   clientId,
      //   operatorName,
      //   timeSlotStart: slotStartUtc,
      //   timeSlotEnd: slotEndUtc,
      //   timeZone,
      // });
      // return 'Operator should be created';
      //@ts-ignore
      if (!image || !image?.length)
        throw new BadRequestException(
          'Please provide a valid image of operator.',
        );
      const imageId = await this.imageService.uploadImage(image);
      let departmentRecord = await this.departmentsService.getDepartmentByName(
        clientId,
        department,
      );
      if (!departmentRecord)
        departmentRecord = await this.departmentsService.createDepartment(
          clientId,
          department,
        );
      return this.operatorsRepository.create({
        machineId,
        clientId,
        operatorName,
        timeSlotStart: slotStartUtc,
        timeSlotEnd: slotEndUtc,
        timeZone,
        imageId,
        department: departmentRecord._id + '',
      });
    }
  }

  async createOperatorFromCSV(
    machineId: string,
    clientId: string,
    operatorName: string,
    timeSlotStart: string,
    timeSlotEnd: string,
    timeZone: string,
    department: string,
  ) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const slotStartUtc = zonedTimeToUtc(
      new Date(`${todayString}T${timeSlotStart}`),
      timeZone,
    )
      .toISOString()
      .slice(11, 16);
    const slotEndUtc = zonedTimeToUtc(
      new Date(`${todayString}T${timeSlotEnd}`),
      timeZone,
    )
      .toISOString()
      .slice(11, 16);
    const operator = await this.operatorsRepository.findOne({
      $and: [
        {
          machineId,
        },
        {
          timeSlotStart: slotStartUtc,
        },
        {
          timeSlotEnd: slotEndUtc,
        },
        {
          timeZone,
        },
      ],
    });

    if (operator)
      throw new ConflictException(
        'An operator is already registered in given time slot on provided machine.',
      );
    else {
      let departmentRecord = await this.departmentsService.getDepartmentByName(
        clientId,
        department,
      );
      if (!departmentRecord)
        departmentRecord = await this.departmentsService.createDepartment(
          clientId,
          department,
        );
      return this.operatorsRepository.create({
        machineId,
        clientId,
        operatorName,
        timeSlotStart: slotStartUtc,
        timeSlotEnd: slotEndUtc,
        timeZone,
        imageId: null,
        department: departmentRecord._id + '',
      });
    }
  }

  async updateOperatorImage(operatorId: string, image: Express.Multer.File) {
    const operator = await this.operatorsRepository.findOne({
      _id: operatorId,
    });
    if (!operator) throw new BadRequestException('Invalid operator id.');
    try {
      const imageId = await this.imageService.updateImage(
        operator.imageId,
        image,
      );
      return this.operatorsRepository.findOneAndUpdate(
        { _id: operatorId },
        { imageId },
      );
      // return 'Image updated.';
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getFileStream(imageId: string) {
    return await this.imageService.getFileStream(imageId);
  }

  async getOperatorsByClient(clientId: ApiClient, page, rows) {
    let pagination = { page: null, rows: null };
    if (page && rows) {
      const numberPage = parseInt(page);
      const numberRows = parseInt(rows);
      pagination = {
        page: numberPage,
        rows: numberRows,
      };
    }
    return this.operatorsRepository.find(
      { clientId },
      pagination.page,
      pagination.rows,
    );
  }

  async getEventsForOperator(
    operatorId: string,
    filters: { dateFrom: null | string; dateTo: null | string },
  ) {
    const events = await this.eventsService.getEventsByPersonId(
      operatorId,
      filters,
    );
    return events;
  }

  async getSingleOperatorAggregation(
    operatorId,
    quickFilter,
    dateFrom,
    dateTo,
  ) {
    const filters = generateFilterObject(quickFilter, dateFrom, dateTo);
    const operator = await this.operatorsRepository.findOne({
      _id: operatorId,
    });
    const opStats =
      await this.operatorsStatsService.findOperatorsStatForOperatorByDateRange(
        operator._id + '',
        filters.dateFrom,
        filters.dateTo,
      );
    const operatorCalculatedStats = calculateOperatorStats(
      operator,
      opStats,
      filters,
    );
    const { isNotOnSeat, ...remainingStats } = operatorCalculatedStats;
    return {
      ...operator['_doc'],
      isNotOnSeat,
      stats: remainingStats,
    };
  }

  /**
   *
   * @param clientId
   * Based on client Id will find Operators and for each operator will calculate
   * percentages of attendance, presence, and distractions and embed the results in the related
   * 'operator' object
   */
  async getOperatorsAggregationByClient(
    clientId: ApiClient,
    quickFilter,
    dateFrom,
    dateTo,
    page,
    rows,
    department,
  ) {
    let pagination = { page: null, rows: null };
    if (page && rows) {
      const numberPage = parseInt(page);
      const numberRows = parseInt(rows);
      pagination = {
        page: numberPage,
        rows: numberRows,
      };
    }
    let operatorFilterQuery: any = { clientId };
    if (
      department &&
      department !== 'null' &&
      department !== 'undefined' &&
      department !== ''
    )
      operatorFilterQuery = { $and: [{ clientId }, { department }] };
    const filters = generateFilterObject(quickFilter, dateFrom, dateTo);
    let operators: any = await this.operatorsRepository.find(
      operatorFilterQuery,
      pagination.page,
      pagination.rows,
    );
    const count = operators.count;
    operators = [...operators.result];
    const stats = [];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const opStats =
        await this.operatorsStatsService.findOperatorsStatForOperatorByDateRange(
          operator._id + '',
          filters.dateFrom,
          filters.dateTo,
        );
      const operatorCalculatedStats = calculateOperatorStats(
        operator,
        opStats,
        filters,
      );
      const { isNotOnSeat, ...remainingStats } = operatorCalculatedStats;
      stats.push(operatorCalculatedStats);
      operators = operators.map((op) => {
        if (op._id === operator._id) {
          return {
            ...operator['_doc'],
            isNotOnSeat,
            stats: remainingStats,
          };
        } else return op;
      });
    }
    const present = stats.filter((stat) => stat.attendancePercentage > 0);
    let overAllAttendance = 0;
    let overAllPresence = 0;
    let overAllAttention = 0;
    let overAllRating = 0;
    const statAttendance = stats.reduce(
      (pervVal, currVal, currInd, arr) =>
        (pervVal += currVal.attendancePercentage),
      0,
    );
    const statPresence = stats.reduce(
      (pervVal, currVal, currInd, arr) =>
        (pervVal += currVal.presencePercentage),
      0,
    );
    const statAttention = stats.reduce(
      (pervVal, currVal, currInd, arr) =>
        (pervVal += currVal.attentionPercentage),
      0,
    );
    const statRating = stats.reduce(
      (pervVal, currVal, currInd, arr) => (pervVal += currVal.rating),
      0,
    );
    overAllAttendance = statAttendance / stats.length;
    overAllPresence = statPresence / stats.length;
    overAllAttention = statAttention / stats.length;
    overAllRating = statRating / stats.length;
    return {
      operators,
      overAllStats: {
        totalCount: stats.length,
        presentCount: present.length,
        presencePercentage: overAllPresence,
        // distractionPercentage: 0,
        attentionPercentage: overAllAttention,
        attendancePercentage: overAllAttendance,
        rating: overAllRating,
      },
      count,
      filters,
    };
  }

  async generateOperatorsAggregationsCSV(
    clientId: ApiClient,
    quickFilter,
    dateFrom,
    dateTo,
    department,
  ) {
    let pagination = { page: -1, rows: -1 };
    let operatorFilterQuery: any = { clientId };
    if (
      department &&
      department !== 'null' &&
      department !== 'undefined' &&
      department !== ''
    )
      operatorFilterQuery = { $and: [{ clientId }, { department }] };
    const filters = generateFilterObject(quickFilter, dateFrom, dateTo);
    let operators: any = await this.operatorsRepository.find(
      operatorFilterQuery,
      pagination.page,
      pagination.rows,
    );
    const count = operators.count;
    operators = [...operators.result];
    const stats = [];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const opStats =
        await this.operatorsStatsService.findOperatorsStatForOperatorByDateRange(
          operator._id + '',
          filters.dateFrom,
          filters.dateTo,
        );
      const operatorCalculatedStats = calculateOperatorStats(
        operator,
        opStats,
        filters,
      );
      const { isNotOnSeat, ...remainingStats } = operatorCalculatedStats;
      stats.push(operatorCalculatedStats);
      operators = operators.map((op) => {
        if (op._id === operator._id) {
          return {
            'Date From': dateFrom,
            'Date To': dateTo,
            'Business Days': operatorCalculatedStats.daysDifference,
            'User Present Days': operatorCalculatedStats.operatorPresentDays,
            User: operator.operatorName,
            Department: operator.department?.departmentName,
            'Total Shift Time': formatTime(operatorCalculatedStats.totalTime),
            'Present Time': formatTime(operatorCalculatedStats.presentTime),
            'Distraction Time': formatTime(
              operatorCalculatedStats.distractedTime,
            ),
            'Attention Time': formatTime(operatorCalculatedStats.attentionTime),
            Attendance: `${fixFloat(
              3,
              operatorCalculatedStats.attendancePercentage,
            )} %`,
            Presence: `${fixFloat(
              3,
              operatorCalculatedStats.presencePercentage,
            )} %`,
            Attention: `${fixFloat(
              3,
              operatorCalculatedStats.attentionPercentage,
            )} %`,
            Distraction: `${fixFloat(
              3,
              operatorCalculatedStats.distractionPercentage,
            )} %`,
            Rating: fixFloat(1, operatorCalculatedStats.rating),
          };
        } else return op;
      });
    }
    try {
      operators.sort(function (a, b) {
        return b.Rating - a.Rating;
      });
      const csv = await json2csvAsync(operators);
      return csv;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async getOperatorsByMachine(machineId: string) {
    return this.operatorsRepository.find({ machineId });
  }

  async getOperators() {
    return this.operatorsRepository.find({});
  }

  async getOperatorsByTimeSlot(timeSlotStart: string, timeSlotEnd: string) {
    return this.operatorsRepository.find({ timeSlotStart, timeSlotEnd });
  }

  async getOperatorsByTimeSlotStart(timeSlotStart: string) {
    return this.operatorsRepository.find({ timeSlotStart });
  }

  async getOperatorsByTimeSlotEnd(timeSlotEnd: string) {
    return this.operatorsRepository.find({ timeSlotEnd });
  }

  async getOperator(operatorId: string) {
    return this.operatorsRepository.findOne({ _id: operatorId });
  }

  async updateOperator(operatorId: string, operatorUpdates: UpdateOperatorDto) {
    return this.operatorsRepository.findOneAndUpdate(
      { _id: operatorId },
      operatorUpdates,
    );
  }
}
