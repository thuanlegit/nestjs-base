import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { PG_SUB_DB } from '@/common/constants';

import { FindAllRolesDto, RoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(@InjectConnection(PG_SUB_DB) private readonly pgSubDb: Knex) {}

  async findAll(query: FindAllRolesDto) {
    const { limit, offset } = query;

    const roles = (await this.pgSubDb
      .select(RoleDto.fields)
      .from('role')
      .limit(limit)
      .offset(offset)) as RoleDto[];

    return roles;
  }
}
