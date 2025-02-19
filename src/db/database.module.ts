import { Module } from '@nestjs/common';

import { knexModules } from './knex.modules';
import { sequelizeModules } from './sequelize.modules';

@Module({
  imports: [...knexModules, ...sequelizeModules],
})
export class DatabaseModule {}
