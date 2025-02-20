import { PickType } from '@nestjs/swagger';

import { Role } from '@/db/pg-sub';

export class RoleDto extends PickType(Role, ['id', 'name', 'description', 'isActive']) {
  static attributes = ['id', 'name', 'description', 'isActive'];
}
