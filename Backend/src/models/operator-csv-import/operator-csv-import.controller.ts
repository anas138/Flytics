import {
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OperatorsCSVImportService } from './operator-csv-import.service';

@Controller('operators-csv-import')
export class OperatorCSVImportController {
  constructor(
    private readonly operatorCSVImportService: OperatorsCSVImportService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async importCSVFile(@UploadedFiles() file: Express.Multer.File, @Req() req) {
    const apiKey = req.decoded;
    return this.operatorCSVImportService.importCSV(file, apiKey.id);
  }
}
