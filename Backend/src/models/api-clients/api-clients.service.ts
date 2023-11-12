import { Injectable } from '@nestjs/common';
import { ApiClientRepository } from './api-clients.repository';
import { UpdateApiClientDto } from './dto/update-api-client.dto';
import { generateApiKey } from 'src/common/utils/api-authentication-generator';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiClientsService {
  constructor(
    private readonly apiClientsRepository: ApiClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getApiClientByID(_id: string) {
    return this.apiClientsRepository.findOne({ _id });
  }

  async getApiClients() {
    return this.apiClientsRepository.find({});
  }

  async createApiClient(name: string) {
    const _id = new mongoose.Types.ObjectId();
    const [key, keyHash] = await generateApiKey();
    const signedKey = this.jwtService.sign({
      id: _id,
      key: key,
    });
    const [secret, secretHash] = await generateApiKey();
    return this.apiClientsRepository.create(
      {
        _id: _id + '',
        name,
        apiKey: '',
        apiSecret: '',
      },
      signedKey,
      keyHash,
      secret,
      secretHash,
    );
  }

  async updateApiClient(_id: string, apiClientUpdates: UpdateApiClientDto) {
    return this.apiClientsRepository.findOneAndUpdate(
      { _id },
      apiClientUpdates,
    );
  }

  async validateKeys(_id: string, clientApiKey: string, clientSecret) {
    return this.apiClientsRepository.findOneAndValidate(
      { _id },
      clientApiKey,
      clientSecret,
    );
  }
}
