import { Controller, Get, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOkPaginatedResponse } from '@/common/decorators';
import { FindAllRolesDto, RoleDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOkPaginatedResponse(RoleDto)
  findAll(@Query() query: FindAllRolesDto) {
    return this.rolesService.findAll(query);
  }
}
