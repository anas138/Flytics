import { Inject, Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
  constructor(@Inject('USERS_MODEL') private readonly userModel: Model<User>) {}

  async create(user: User) {
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();
    const { password, ...result } = savedUser["_doc"];
    return result;
  }

  async findOne(userFilterQuery: FilterQuery<User>) {
    return this.userModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<User>) {
    return this.userModel.find(userFilterQuery);
  }
}
