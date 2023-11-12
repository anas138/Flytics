import { ConflictException, Injectable } from '@nestjs/common';
import { DepartmentsRepository } from './departments.repository';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentsRepository: DepartmentsRepository) {}

  async createDepartment(clientId: string, departmentName: string) {
    const department = await this.departmentsRepository.findOne({
      $and: [{ clientId }, { departmentName }],
    });
    if (department)
      throw new ConflictException(
        'A department with given name already exists.',
      );
    return this.departmentsRepository.create({ clientId, departmentName });
  }

  async getDepartmentsByClient(clientId: string) {
    return this.departmentsRepository.find({ clientId });
  }

  async getDepartmentById(departmentId: string) {
    return this.departmentsRepository.findOne({ _id: departmentId });
  }

  async getDepartmentByName(clientId: string, departmentName: string) {
    return this.departmentsRepository.findOne({
      $and: [{ clientId }, { departmentName }],
    });
  }

  async UpdateDepartment(
    departmentId: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsRepository.findOneAndUpdate(
      { _id: departmentId },
      updateDepartmentDto,
    );
  }
}
