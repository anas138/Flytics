import { Inject, Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { Department } from './schemas/departments.schema';

@Injectable()
export class DepartmentsRepository {
  constructor(
    @Inject('DEPARTMENTS_MODEL')
    private readonly departmentsModel: Model<Department>,
  ) {}

  async create(department: Department) {
    const newDepartment = new this.departmentsModel(department);
    return newDepartment.save();
  }

  async findOne(departmentFilterQuery: FilterQuery<Department>) {
    return this.departmentsModel.findOne(departmentFilterQuery);
  }
  async find(departmentFilterQuery: FilterQuery<Department>) {
    return this.departmentsModel.find(departmentFilterQuery);
  }

  async findOneAndUpdate(
    departmentFilterQuery: FilterQuery<Department>,
    department: Partial<Department>,
  ) {
    return this.departmentsModel.findOneAndUpdate(
      departmentFilterQuery,
      department,
      {
        new: true,
      },
    );
  }
}
