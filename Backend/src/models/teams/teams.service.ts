import { Inject, Injectable } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async createTeam(
    title: string,
    teamLead: string,
    projects: string[],
    owner: string,
  ) {
    return this.teamsRepository.create({ title, teamLead, projects, owner });
  }

  async findTeamById(teamId: string) {
    return this.teamsRepository.findOne({ _id: teamId });
  }

  async getTeamsByOwnerId(owner: string) {
    return this.teamsRepository.find({ owner });
  }

  async getAllTeams() {
    return this.teamsRepository.find({});
  }
}
