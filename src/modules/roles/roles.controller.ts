import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiOkPaginatedResponse } from '@/common/decorators';

import { FindAllRolesDto, RoleDto } from './dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOkPaginatedResponse(RoleDto)
  findAll(@Query() query: FindAllRolesDto) {
    return this.rolesService.findAll(query);
  }
}
