import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class UserAuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers['x-auth-token'] as string;
    if (!authToken)
      throw new UnauthorizedException('Access denied. Auth token missing.');
    else {
      try {
        const decoded = this.jwtService.verify(authToken);
        if (decoded) {
          const { id } = decoded;
          const user = this.usersService.findUserById(id);
          if (!user) throw new UnauthorizedException('Invalid token.');
          else next();
        } else {
          throw new UnauthorizedException('Invalid token.');
        }
      } catch (e) {
        throw new UnauthorizedException('Invalid token.');
      }
    }
  }
}
