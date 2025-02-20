import { ApiProperty, PickType } from '@nestjs/swagger';

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
  @ApiProperty({ type: UserDto })
  user!: UserDto;

  static attributes = ['id', 'title', 'content', 'userId', 'createdAt', 'updatedAt'];
}
