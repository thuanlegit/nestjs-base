import { Module } from '@nestjs/common';

import { knexModules } from './_knex-modules';
import { sequelizeModules } from './_sequelize-modules';

@Module({
  imports: [...knexModules, ...sequelizeModules],
})
export class DatabaseModule {}
