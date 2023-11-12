import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role,
      createUserDto.teams,
    );
  }

  @Post('login')
  async logUserIn(@Body() createUserDto: CreateUserDto) {
    return this.usersService.validateUser(
      createUserDto.username,
      createUserDto.password,
    );
  }
}
