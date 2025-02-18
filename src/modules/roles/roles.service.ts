import { Injectable } from '@nestjs/common';
import { FindAllRolesDto, RoleDto } from './dto';
import { InjectConnection } from 'nest-knexjs';
import { PG_SUB_DB } from '@/common/constants';
import { Knex } from 'knex';

@Injectable()
export class RolesService {
  constructor(@InjectConnection(PG_SUB_DB) private readonly pgSubDb: Knex) {}

  async findAll(query: FindAllRolesDto) {
    const { limit, offset } = query;

    const roles: RoleDto[] = await this.pgSubDb
      .select(RoleDto.fields)
      .from('role')
      .limit(limit)
      .offset(offset);

    return roles;
  }
}
