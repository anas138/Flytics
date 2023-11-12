import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiHeaders } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiClientsService } from './api-clients.service';
import { CreateApiClientDto } from './dto/create-api-client.dto';

@Controller('api-clients')
export class ApiClientsController {
  constructor(private readonly apiClientsService: ApiClientsService) {}
  @ApiHeaders([{ name: 'x-auth-token' }])
  @Get()
  async getApiCLients() {
    return this.apiClientsService.getApiClients();
  }

  @ApiHeaders([{ name: 'x-auth-token' }])
  @Post()
  async createApiClient(@Body() createApiClientDto: CreateApiClientDto) {
    return this.apiClientsService.createApiClient(createApiClientDto.name);
  }
  // @Get('validate')
  // async validateKey(@Body('decoded') decoded, @Body('apiSecret') apiSecret) {
  //   console.log('Validated api key and secret.');
  //   // this.apiClientsService.validateKeys(decoded.id, decoded.key, apiSecret);
  // }
}
