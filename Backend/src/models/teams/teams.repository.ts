import { Inject, Injectable } from '@nestjs/common';
import { Team } from './schemas/teams.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class TeamsRepository {
  constructor(@Inject('TEAMS_MODEL') private readonly teamModel: Model<Team>) {}

  async create(team: Team) {
    const newTeam = new this.teamModel(team);
    const result = await newTeam.save();
    return result;
  }

  async findOne(teamFilterQuery: FilterQuery<Team>) {
    return this.teamModel
      .findOne(teamFilterQuery)
      .populate('teamLead')
      .populate('projects');
  }

  async find(teamFilterQuery: FilterQuery<Team>) {
    return this.teamModel.find(teamFilterQuery);
  }
}
