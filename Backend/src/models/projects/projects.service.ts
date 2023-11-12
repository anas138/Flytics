import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async createProject(title: string, owner: string) {
    return this.projectsRepository.create({ title, owner });
  }

  async getProjectById(projectId: string) {
    return this.projectsRepository.findOne({ _id: projectId });
  }

  async getProjectsByOwnerId(ownerId) {
    return this.projectsRepository.find({ owner: ownerId });
  }
}
