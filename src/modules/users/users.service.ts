import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { PG_MAIN_KNEX } from '@/common/constants';
import { PaginatedResponse } from '@/common/dto';

import { CreateUserDto, FindAllUsersDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectConnection(PG_MAIN_KNEX) private readonly pgMainKnex: Knex) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const users = (await this.pgMainKnex
      .insert(createUserDto, UserDto.attributes)
      .into('user')) as UserDto[];
    if (!users.length) {
      throw new NotFoundException(`User with email ${createUserDto.email} already exists`);
    }
    const user = users[0];
    return user;
  }

  async findAll(query: FindAllUsersDto): Promise<PaginatedResponse<UserDto>> {
    const { limit, offset } = query;
    const users = (await this.pgMainKnex
      .select(UserDto.attributes)
      .from('user')
      .limit(limit)
      .offset(offset)) as UserDto[];
    return {
      limit,
      offset,
      total: users.length,
      data: users,
    };
  }

  async findOne(id: number): Promise<UserDto> {
    const users = (await this.pgMainKnex
      .select(UserDto.attributes)
      .from('user')
      .where('id', id)) as UserDto[];

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const users = (await this.pgMainKnex
      .table('user')
      .update(updateUserDto, UserDto.attributes)
      .where('id', id)) as UserDto[];

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }

  async remove(id: number): Promise<UserDto> {
    const users = (await this.pgMainKnex
      .table('user')
      .where('id', id)
      .del(UserDto.attributes)) as UserDto[];

    if (!users.length) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }
}
