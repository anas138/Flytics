import { BullModule } from '@nestjs/bull';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/config/database-config/database.module';
import { AlertsGateway } from './common/gateways/alerts-gateway/alerts.gateway';
import { ApiKeyAuthenticationMiddleware } from './common/middleware/api-key-authentication/api-key-authentication.middleware';
import { ApiClientAuthenticationModule } from './common/middleware/api-key-authentication/api-key-authentication.module';
import { UserAuthenticationMiddleware } from './common/middleware/user-authentication/user-authentication.middleware';
import { UserAuthenticationModule } from './common/middleware/user-authentication/user-authentication.module';
import { AlertQueueModule } from './common/queues/alerts-queue/alert-queue.module';
import { StatsCalculationQueueModule } from './common/queues/stats-calculation-queue/stats-calculation-queue.module';
import { StatsCalculationConsumer } from './common/queues/stats-calculation-queue/stats-calculation.consumer';
import { AlertsController } from './models/alerts/alerts.controller';
import { AlertsModule } from './models/alerts/alerts.module';
import { ApiClientsController } from './models/api-clients/api-clients.controller';
import { APiClientsModule } from './models/api-clients/api-clients.module';
import { apiClientProviders } from './models/api-clients/api-clients.providers';
import { ApiClientRepository } from './models/api-clients/api-clients.repository';
import { ApiClientsService } from './models/api-clients/api-clients.service';
import { DepartmentsController } from './models/departments/departments.controller';
import { DepartmentsModule } from './models/departments/departments.module';
import { EventsController } from './models/events/events.controller';
import { EventsModule } from './models/events/events.module';
import { OperatorCSVImportController } from './models/operator-csv-import/operator-csv-import.controller';
import { OperatorCSVImportModule } from './models/operator-csv-import/operator-csv-import.module';
import { OperatorsController } from './models/operstors/operators.controller';
import { OperatorsModule } from './models/operstors/operators.module';
import { ProjectsController } from './models/projects/projects.controller';
import { ProjectsModule } from './models/projects/projects.module';
import { TeamsController } from './models/teams/teams.controller';
import { TeamsModule } from './models/teams/teams.module';
import { UsersModule } from './models/users/users.module';
import { usersProviders } from './models/users/users.providers';
import { UsersRepository } from './models/users/users.repository';
import { UsersService } from './models/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST_QUEUE,
        port: Number(process.env.REDIS_PORT_QUEUE),
      },
    }),
    StatsCalculationQueueModule,
    AlertQueueModule,
    APiClientsModule,
    JwtModule.register({ secret: 'myJwtSecretKey' }),
    ApiClientAuthenticationModule,
    UserAuthenticationModule,
    DatabaseModule,
    EventsModule,
    UsersModule,
    OperatorsModule,
    ProjectsModule,
    TeamsModule,
    AlertsModule,
    OperatorCSVImportModule,
    DepartmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AlertsGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyAuthenticationMiddleware)
      .forRoutes(
        EventsController,
        OperatorsController,
        ProjectsController,
        TeamsController,
        AlertsController,
        OperatorCSVImportController,
        DepartmentsController,
      );
    consumer
      .apply(UserAuthenticationMiddleware)
      .forRoutes(ApiClientsController);
  }
}
