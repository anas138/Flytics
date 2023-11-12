import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { ApiClientsService } from 'src/models/api-clients/api-clients.service';

@Injectable()
export class ApiKeyAuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly apiClientsService: ApiClientsService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const clientApiKey = req.headers['x-auth-api-key'] as string;
    const clientApiSecret = req.headers['x-auth-api-secret'];
    if (!clientApiKey || !clientApiSecret)
      throw new UnauthorizedException(
        'Access denied. Api Key or Secret missing.',
      );
    try {
      const decoded = this.jwtService.verify(clientApiKey);
      //@ts-ignore
      req.decoded = decoded;
      req.body.decoded = decoded;
      req.body.apiSecret = clientApiSecret;
      if (
        await this.apiClientsService.validateKeys(
          decoded.id,
          decoded.key,
          clientApiSecret,
        )
      )
        next();
      else throw new BadRequestException('Invalid Api key or secret.');
    } catch (err) {
      throw new BadRequestException('Invalid Api key or secret.');
    }
  }
}
