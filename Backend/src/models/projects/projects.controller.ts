import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Body('decoded') apiClient,
  ) {
    return this.projectsService.createProject(
      createProjectDto.title,
      apiClient.id,
    );
  }

  @Get()
  async getProjectsByOwnerId(@Body('decoded') apiClient) {
    return this.projectsService.getProjectsByOwnerId(apiClient.id);
  }
}
