import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as winston from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus;
    let responseBody;
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      responseBody = exception.getResponse();
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        statusCode: httpStatus,
        message: 'Something went wrong on SERVER!', //exception.message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
      winston.error(exception.message, exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
