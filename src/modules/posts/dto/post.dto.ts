import { PickType } from '@nestjs/swagger';

import { Post } from '@/db/pg-main';
import { UserDto } from '@/modules/users/dto';

export class PostDto extends PickType(Post, [
  'id',
  'title',
  'content',
  'userId',
  'createdAt',
  'updatedAt',
]) {
  user!: UserDto;

  static attributes = ['id', 'title', 'content', 'userId', 'createdAt', 'updatedAt'];
}
