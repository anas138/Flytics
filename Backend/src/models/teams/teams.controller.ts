import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
    @Body('decoded') apiClient,
  ) {
    return this.teamsService.createTeam(
      createTeamDto.title,
      createTeamDto.teamLead,
      createTeamDto.projects,
      apiClient.id,
    );
  }

  @Get()
  async getTeamsByClientId(@Body('decoded') apiClient) {
    return this.teamsService.getTeamsByOwnerId(apiClient.id);
  }

  @Get(':id')
  async getTeamById(@Param('id') teamId: string) {
    return this.teamsService.findTeamById(teamId);
  }
}
