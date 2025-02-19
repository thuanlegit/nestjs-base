import { Module } from '@nestjs/common';

import { knexModules } from './knex.modules';

@Module({
  imports: [...knexModules],
})
export class DatabaseModule {}
