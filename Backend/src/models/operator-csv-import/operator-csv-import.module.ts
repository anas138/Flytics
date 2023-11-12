import { Module } from '@nestjs/common';
import { OperatorsModule } from '../operstors/operators.module';
import { OperatorCSVImportController } from './operator-csv-import.controller';
import { OperatorsCSVImportService } from './operator-csv-import.service';

@Module({
  imports: [OperatorsModule],
  controllers: [OperatorCSVImportController],
  providers: [OperatorsCSVImportService],
})
export class OperatorCSVImportModule {}
