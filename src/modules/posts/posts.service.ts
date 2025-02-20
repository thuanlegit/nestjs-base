import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { PG_MAIN_SEQUELIZE } from '@/common/constants';
import { PaginatedResponse } from '@/common/dto';
import { Post, User } from '@/db/pg-main';
import { toSnakeCase } from '@/utils';

import { UserDto } from '../users/dto';
import { CreatePostDto, FindAllPostsDto, PostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectConnection(PG_MAIN_SEQUELIZE) private readonly pgMainSequelize: Sequelize,
    @InjectModel(Post, PG_MAIN_SEQUELIZE) private readonly postModel: typeof Post,
    @InjectModel(User, PG_MAIN_SEQUELIZE) private readonly userModel: typeof User,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostDto> {
    const user = await this.userModel.findByPk(createPostDto.userId, {
      attributes: UserDto.attributes,
    });
    if (!user) {
      throw new BadRequestException('Invalid user ID');
    }

    const post = await this.postModel.create(
      { ...createPostDto },
      { returning: PostDto.attributes.map(toSnakeCase) },
    );

    (post.dataValues as PostDto).user = user;
    return post;
  }

  async findAll(query: FindAllPostsDto): Promise<PaginatedResponse<PostDto>> {
    const { limit, offset } = query;

    const posts = (await this.postModel.findAll({
      attributes: PostDto.attributes,
      limit,
      offset,
      include: [{ model: User, as: 'user', attributes: UserDto.attributes }],
    })) as PostDto[];

    return {
      limit,
      offset,
      total: posts.length,
      data: posts,
    };
  }

  async findOne(id: string): Promise<PostDto> {
    const post = (await this.postModel.findByPk(id, {
      attributes: PostDto.attributes,
      include: [{ model: User, as: 'user', attributes: UserDto.attributes }],
    })) as PostDto | null;

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postModel.findByPk(id, {
      attributes: PostDto.attributes,
      include: [{ model: User, as: 'user', attributes: UserDto.attributes }],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    if (updatePostDto.userId != null) {
      const user = await this.userModel.findByPk(updatePostDto.userId, {
        attributes: UserDto.attributes,
      });
      if (!user) {
        throw new BadRequestException('Invalid user ID');
      }

      (post.dataValues as PostDto).user = user;
    }
    await post.update(updatePostDto);

    return post as PostDto;
  }

  async remove(id: string) {
    const post = await this.postModel.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: UserDto.attributes }],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    await post.destroy();
    return post;
  }

  // In case you want to use transaction
  async transaction() {
    await this.pgMainSequelize.transaction(async transaction => {
      const post = await this.postModel.create(
        { title: 'test', content: 'test', userId: 1 },
        { transaction },
      );
      const user = await post.$get('user', { transaction });
      if (!user) {
        throw new NotFoundException(`User with id ${1} not found`);
      }
      post.user = user;
    });
  }
}
