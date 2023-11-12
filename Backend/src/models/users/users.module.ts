import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/common/config/database-config/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, JwtModule.register({ secret: 'myJwtSecretKey' })],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, ...usersProviders],
  exports:[UsersRepository, UsersService, ...usersProviders]
})
export class UsersModule {}
