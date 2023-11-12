import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { APiClientsModule } from 'src/models/api-clients/api-clients.module';
import { apiClientProviders } from 'src/models/api-clients/api-clients.providers';
import { ApiClientRepository } from 'src/models/api-clients/api-clients.repository';
import { ApiClientsService } from 'src/models/api-clients/api-clients.service';
import { ApiKeyAuthenticationMiddleware } from './api-key-authentication.middleware';

@Module({
  imports: [
    DatabaseModule,
    APiClientsModule,
    JwtModule.register({ secret: 'myJwtSecretKey' }),
  ],
  providers: [ApiKeyAuthenticationMiddleware],
})
export class ApiClientAuthenticationModule {}
