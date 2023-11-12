import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { operatorsCSVHeaders } from 'src/common/constants/csv-headers';
import { createOperatorSchema } from 'src/common/constants/joi-validation-schemas';
import { OperatorsService } from '../operstors/operators.service';

@Injectable()
export class OperatorsCSVImportService {
  constructor(private readonly operatorService: OperatorsService) {}

  validateEntryRecord(value) {
    const { error } = createOperatorSchema.validate(value);
    if (error) {
      throw new BadRequestException(` ${error.message}`);
    }
    return value;
  }

  async importCSV(file: Express.Multer.File, clientId) {
    //@ts-ignore
    if (!file || !file.length)
      throw new BadRequestException('Please provide a valid csv file.');
    else {
      const csvFile = file[0];
      if (
        csvFile.mimetype === 'text/csv' ||
        csvFile.mimetype === 'application/vnd.ms-excel'
      ) {
        const fileContent = String(csvFile.buffer).replace(
          /(?:\\[rn]|[\r\n]+)+/g,
          '\n',
        );
        let fileHeaders = fileContent.split('\n')[0].split(',');
        fileHeaders[fileHeaders.length - 1] = fileHeaders[
          fileHeaders.length - 1
        ].replace('\r', '');
        let errorMsg = '';
        operatorsCSVHeaders.forEach((item) => {
          if (!fileHeaders.includes(item.key)) {
            errorMsg = errorMsg + '\n' + `[${item.key}]`;
          }
        });
        if (errorMsg !== '') {
          errorMsg = 'Following Fields Missing ' + errorMsg;
          console.log('ERROR: ', errorMsg);
          throw new BadRequestException(errorMsg);
        }

        let parsedCsvData = fileContent.split('\n');
        parsedCsvData = parsedCsvData.slice(1, parsedCsvData.length);
        const createdRecords = [];
        for (let i = 0; i < parsedCsvData.length; i++) {
          const record = parsedCsvData[i].split(',');
          try {
            const Valid_result = this.validateEntryRecord({
              machineId: record[0],
              //   clientId: record[0],
              operatorName: record[1],
              timeSlotStart: record[2],
              timeSlotEnd: record[3],
              department: record[4],
              timeZone: record[5],
            });
            const obj = {
              ...Valid_result,
              clientId,
            };
            const result = await this.operatorService.createOperatorFromCSV(
              obj.machineId,
              obj.clientId,
              obj.operatorName,
              obj.timeSlotStart,
              obj.timeSlotEnd,
              obj.timeZone,
              obj.department,
            );
            createdRecords.push(result);
          } catch (err) {
            switch (err.status) {
              case 400: {
                throw new HttpException(
                  {
                    message: err.message,
                    data: createdRecords,
                    errorObject: {
                      machineId: record[0],
                      //   clientId: record[0],
                      operatorName: record[1],
                      timeSlotStart: record[2],
                      timeSlotEnd: record[3],
                      timeZone: record[4],
                    },
                    errObjectIndex: i + 1,
                  },
                  err.status,
                );
              }
              case 409: {
                continue;
              }
              default: {
                throw new HttpException(err.message, err.status);
              }
            }
          }
        }
        return createdRecords;
      } else throw new BadRequestException('File must be in .csv format.');
    }
  }
}
