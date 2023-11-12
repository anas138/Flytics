import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { UsersModule } from 'src/models/users/users.module';
import { usersProviders } from 'src/models/users/users.providers';
import { UsersRepository } from 'src/models/users/users.repository';
import { UsersService } from 'src/models/users/users.service';
import { UserAuthenticationMiddleware } from './user-authentication.middleware';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({ secret: 'myJwtSecretKey' }),
  ],
  providers: [UserAuthenticationMiddleware],
})
export class UserAuthenticationModule {}
