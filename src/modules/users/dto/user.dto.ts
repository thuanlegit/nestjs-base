import { PickType } from '@nestjs/swagger';

import { User } from '@/db/pg-main/models';

export class UserDto extends PickType(User, ['id', 'email', 'name']) {
  static attributes = ['id', 'email', 'name'];
}
