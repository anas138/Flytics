import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { AllExceptionsFilter } from './common/middleware/all-exception-filter.middleware';
import logger from './common/startup/logger';

async function bootstrap() {
  const port = parseInt(process.env.SERVER_PORT, 10);
  const app = await NestFactory.create(AppModule, { cors: true });
  logger();
  app.use(morgan('tiny'));

  const config = new DocumentBuilder()
    .setTitle('Flytics')
    .setDescription('This document contains the API end point documentation')
    .setVersion('1.4.13')
    .addTag('Flytics')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  await app.listen(port, () =>
    winston.info(`App listening on port ${port}...`),
  );
}
bootstrap();
