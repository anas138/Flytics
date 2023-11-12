import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiHeaders } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@ApiHeaders([{ name: 'x-auth-api-key' }, { name: 'x-auth-api-secret' }])
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Req() req,
  ) {
    const apiClient = req.decoded;
    createDepartmentDto.clientId = apiClient.id;
    return this.departmentsService.createDepartment(
      createDepartmentDto.clientId,
      createDepartmentDto.departmentName,
    );
  }

  @Get()
  async getDepartments(@Req() req) {
    const apiClient = req.decoded;
    return this.departmentsService.getDepartmentsByClient(apiClient.id);
  }
}
