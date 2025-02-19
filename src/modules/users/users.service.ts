import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { PG_MAIN_KNEX } from '@/common/constants';

import { CreateUserDto, FindAllUsersDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectConnection(PG_MAIN_KNEX) private readonly pgMainKnex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    const user = (await this.pgMainKnex
      .insert(createUserDto, UserDto.fields)
      .into('user')) as UserDto[];
    return user;
  }

  async findAll(query: FindAllUsersDto) {
    const { limit, offset } = query;
    const users = (await this.pgMainKnex
      .select(UserDto.fields)
      .from('user')
      .limit(limit)
      .offset(offset)) as UserDto[];
    return users;
  }

  async findOne(id: number) {
    const users = (await this.pgMainKnex
      .select(UserDto.fields)
      .from('user')
      .where('id', id)) as UserDto[];

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const users = (await this.pgMainKnex
      .table('user')
      .update(updateUserDto, UserDto.fields)
      .where('id', id)) as UserDto[];

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }

  async remove(id: number) {
    const users = (await this.pgMainKnex
      .table('user')
      .where('id', id)
      .del(UserDto.fields)) as UserDto[];

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }
}
