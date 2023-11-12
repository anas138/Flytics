import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { compareKey } from 'src/common/utils/api-authentication-generator';
import * as winston from 'winston';
import { ApiClient } from './schemas/api-clients.schema';

@Injectable()
export class ApiClientRepository {
  constructor(
    @Inject('API_CLIENT_MODEL')
    private readonly apiClientModel: Model<ApiClient>,
  ) {}

  async create(
    apiClient: ApiClient,
    apiKey: string,
    apiKeyHash: string,
    apiSecret: string,
    apiSecretHash: string,
  ) {
    const obj = { ...apiClient, apiKey: apiKeyHash, apiSecret: apiSecretHash };
    const newApiClient = new this.apiClientModel({
      ...obj,
    });
    const savedObj = await newApiClient.save();
    const { name, _id, __v } = savedObj;
    return { name, _id, __v, apiKey, apiSecret };
  }

  async findOne(apiClientFilterQuery: FilterQuery<ApiClient>) {
    return this.apiClientModel
      .findOne(apiClientFilterQuery)
      .select('-apiKey -apiSecret');
  }

  async find(apiClientsFilterQuery: FilterQuery<ApiClient>) {
    return this.apiClientModel
      .find(apiClientsFilterQuery)
      .select('-apiKey -apiSecret');
  }

  async findOneAndUpdate(
    apiClientFilterQuery: FilterQuery<ApiClient>,
    apiClient: Partial<ApiClient>,
  ) {
    return this.apiClientModel
      .findOneAndUpdate(apiClientFilterQuery, apiClient, { new: true })
      .select('-apiKey -apiSecret');
  }

  async findOneAndValidate(
    apiClientFilterQuery: FilterQuery<ApiClient>,
    apiKey,
    apiSecret,
  ) {
    const client = await this.apiClientModel.findOne(apiClientFilterQuery);
    if (!client)
      throw new UnauthorizedException('Incorrect api key or secret.');
    if (
      !(await compareKey(apiKey, client.apiKey)) ||
      !(await compareKey(apiSecret, client.apiSecret))
    )
      throw new UnauthorizedException('Incorrect api key or secret.');
    return true;
  }
}
