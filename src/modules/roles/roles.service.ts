import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { PG_SUB_KNEX } from '@/common/constants';
import { PaginatedResponse } from '@/common/dto';

import { FindAllRolesDto, RoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(@InjectConnection(PG_SUB_KNEX) private readonly pgSubKnex: Knex) {}

  async findAll(query: FindAllRolesDto): Promise<PaginatedResponse<RoleDto>> {
    const { limit, offset } = query;

    const roles = (await this.pgSubKnex
      .select(RoleDto.attributes)
      .from('role')
      .limit(limit)
      .offset(offset)) as RoleDto[];

    return {
      limit,
      offset,
      total: roles.length,
      data: roles,
    };
  }
}
