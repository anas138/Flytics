import { Inject, Injectable } from '@nestjs/common';
import { Project } from './schemas/projects.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class ProjectsRepository {
  constructor(
    @Inject('PROJECTS_MODEL') private readonly projectsModel: Model<Project>,
  ) {}

  async create(project: Project) {
    const newProject = new this.projectsModel(project);
    return await newProject.save();
  }

  async findOne(projectFilterQuery: FilterQuery<Project>) {
    return this.projectsModel.findOne(projectFilterQuery);
  }

  async find(projectFilterQuery: FilterQuery<Project>) {
    return this.projectsModel.find(projectFilterQuery);
  }
}
