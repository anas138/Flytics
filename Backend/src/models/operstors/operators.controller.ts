import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeaders, ApiQuery } from '@nestjs/swagger';
import { createOperatorSchema } from 'src/common/constants/joi-validation-schemas';
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { OperatorsService } from './operators.service';
import * as streamToBlob from 'stream-to-blob';
import { createReadStream } from 'fs';

import {Readable} from "stream"

@ApiHeaders([{ name: 'x-auth-api-key' }, { name: 'x-auth-api-secret' }])
@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        machineId: { type: 'string' },
        operatorName: { type: 'string' },
        timeSlotStart: { type: 'string' },
        timeSlotEnd: { type: 'string' },
        timeZone: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async createOperator(
    @UploadedFiles() file: Express.Multer.File,
    @Body(new JoiValidationPipe(createOperatorSchema))
    createOperatorDto: CreateOperatorDto,
    @Req() req,
  ) {
    const apiClient = req.decoded;
    return this.operatorsService.createOperator(
      createOperatorDto.machineId,
      apiClient.id,
      createOperatorDto.operatorName,
      createOperatorDto.timeSlotStart,
      createOperatorDto.timeSlotEnd,
      createOperatorDto.timeZone,
      createOperatorDto.department,
      file,
    );
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':operatorId/update-image')
  @UseInterceptors(FilesInterceptor('image'))
  async updateOperatorImage(
    @Param('operatorId') operatorId: string,
    @UploadedFiles() file: Express.Multer.File,
    @Req() req,
  ) {
    const apiClient = req.decoded;
    return this.operatorsService.updateOperatorImage(operatorId, file);
  }

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
  async getOperatorsByClient(
    @Body('decoded') apiClient,
    @Query('page') page,
    @Query('rows') rows,
  ) {
    return this.operatorsService.getOperatorsByClient(apiClient.id, page, rows);
  }

  @ApiQuery({
    name: 'id',
    type: 'string',
    description: 'A valid machine id.',
  })
  @Get('get-by-machine-id')
  async getOperatorsByMachineId(@Query('id') machineId: string) {
    return this.operatorsService.getOperatorsByMachine(machineId);
  }

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
  @ApiQuery({
    name: 'quick-filter',
    required: false,
    enum: ['d', 'w', 'm', null],
    description: "'d' = Current day; 'w' = Past Week; 'm' = Past Month",
  })
  @ApiQuery({
    name: 'date-from',
    required: false,
    description: "A date string in the format 'YYYY-MM-DD'",
  })
  @ApiQuery({
    name: 'date-to',
    required: false,
    description:
      "A date string in the format 'YYYY-MM-DD'. Must be greater than the 'date-from' value.",
  })
  @ApiQuery({
    name: 'department',
    required: false,
    description:
      'A mongo object id for department to filter out operators on specific department. Leave null to get all departments data.',
  })
  @Get('operators-summary')
  async getAggregatedSummary(
    @Body('decoded') apiClient,
    @Query('quick-filter') quickFilter: string,
    @Query('date-from') dateFrom: string,
    @Query('date-to') dateTo: string,
    @Query('page') page,
    @Query('rows') rows,
    @Query('department') department: string,
  ) {
    return this.operatorsService.getOperatorsAggregationByClient(
      apiClient.id,
      quickFilter,
      dateFrom,
      dateTo,
      page,
      rows,
      department,
    );
  }

  @ApiQuery({
    name: 'quick-filter',
    required: false,
    enum: ['d', 'w', 'm', null],
    description: "'d' = Current day; 'w' = Past Week; 'm' = Past Month",
  })
  @ApiQuery({
    name: 'date-from',
    required: false,
    description: "A date string in the format 'YYYY-MM-DD'",
  })
  @ApiQuery({
    name: 'date-to',
    required: false,
    description:
      "A date string in the format 'YYYY-MM-DD'. Must be greater than the 'date-from' value.",
  })
  @ApiQuery({
    name: 'department',
    required: false,
    description:
      'A mongo object id for department to filter out operators on specific department. Leave null to get all departments data.',
  })
  @Get('operators-summary-csv')
  async getAggregatedSummaryCSV(
    @Body('decoded') apiClient,
    @Query('quick-filter') quickFilter: string,
    @Query('date-from') dateFrom: string,
    @Query('date-to') dateTo: string,
    @Query('department') department: string,
    @Res() res,
  ) {
    const csv = await this.operatorsService.generateOperatorsAggregationsCSV(
      apiClient.id,
      quickFilter,
      dateFrom,
      dateTo,
      department,
    );
    const streamObj = new Readable();
    streamObj.push(csv);
    streamObj.push(null);
    return streamObj.pipe(res);
  }

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
  @ApiQuery({
    name: 'quick-filter',
    required: false,
    enum: ['d', 'w', 'm', null],
    description: "'d' = Current day; 'w' = Past Week; 'm' = Past Month",
  })
  @ApiQuery({
    name: 'date-from',
    required: false,
    description: "A date string in the format 'YYYY-MM-DD'",
  })
  @ApiQuery({
    name: 'date-to',
    required: false,
    description:
      "A date string in the format 'YYYY-MM-DD'. Must be greater than the 'date-from' value.",
  })
  @Get('operators-summary/:operatorId')
  async getIndividualAggregatedSummary(
    @Param('operatorId') operatorId,
    @Query('quick-filter') quickFilter: string,
    @Query('date-from') dateFrom: string,
    @Query('date-to') dateTo: string,
  ) {
    return this.operatorsService.getSingleOperatorAggregation(
      operatorId,
      quickFilter,
      dateFrom,
      dateTo,
    );
  }

  @Get('get-image')
  @Header('Content-Type', 'image/webp')
  async getImageById(@Res() res, @Query('image-id') imageId) {
    const file = await this.operatorsService.getFileStream(imageId);
    return file.pipe(res);
    // const blob = await streamToBlob(file);
    // return blob;
  }
}
