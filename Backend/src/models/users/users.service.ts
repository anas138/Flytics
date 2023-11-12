import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  compareKey,
  encodeString,
} from 'src/common/utils/api-authentication-generator';
import { UsersRepository } from './users.repository';

Injectable();
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    username: string,
    password: string,
    role: string,
    teams: string[],
  ) {
    const hashedPassword = await encodeString(password);
    const user = await this.usersRepository.findOne({ username });
    if (user) throw new ConflictException('User already exists.');
    else
      return this.usersRepository.create({
        username,
        password: hashedPassword,
        role,
        teams,
      });
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOne({ username });
    if (!user)
      throw new UnauthorizedException('Incorrect username or password.');
    else {
      if (await compareKey(password, user.password)) {
        const token = this.jwtService.sign({
          id: user._id,
        });
        const { password, ...result } = user['_doc'];
        return { user: result, token };
      } else {
        throw new UnauthorizedException('Incorrect username or password.');
      }
    }
  }

  async findUserById(userId: string) {
    return this.usersRepository.findOne({ _id: userId });
  }
}
