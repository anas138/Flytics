import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { ApiClientsController } from './api-clients.controller';
import { apiClientProviders } from './api-clients.providers';
import { ApiClientRepository } from './api-clients.repository';
import { ApiClientsService } from './api-clients.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    JwtModule.register({ secret: 'myJwtSecretKey' }),
  ],
  controllers: [ApiClientsController],
  providers: [ApiClientsService, ApiClientRepository, ...apiClientProviders],
  exports: [ApiClientsService, ApiClientRepository, ...apiClientProviders],
})
export class APiClientsModule {}
