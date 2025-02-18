import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, FindAllUsersDto, UpdateUserDto, UserDto } from './dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { PG_MAIN_DB } from '@/common/constants';

@Injectable()
export class UsersService {
  constructor(@InjectConnection(PG_MAIN_DB) private readonly pgMainDb: Knex) {}

  async create(createUserDto: CreateUserDto) {
    const user: UserDto[] = await this.pgMainDb.insert(createUserDto, UserDto.fields).into('user');
    return user;
  }

  async findAll(query: FindAllUsersDto) {
    const { limit, offset } = query;
    const users: UserDto[] = await this.pgMainDb
      .select(UserDto.fields)
      .from('user')
      .limit(limit)
      .offset(offset);
    return users;
  }

  async findOne(id: number) {
    const users: UserDto[] = await this.pgMainDb
      .select(UserDto.fields)
      .from('user')
      .where('id', id);

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const users: UserDto[] = await this.pgMainDb
      .table('user')
      .update(updateUserDto, UserDto.fields)
      .where('id', id);

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }

  async remove(id: number) {
    const users: UserDto[] = await this.pgMainDb.table('user').where('id', id).del(UserDto.fields);

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }
}
