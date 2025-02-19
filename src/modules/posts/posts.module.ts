import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PG_MAIN_SEQUELIZE } from '@/common/constants';
import { Post, User } from '@/db/pg-main/models';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Post, User], PG_MAIN_SEQUELIZE)],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
