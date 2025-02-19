import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { PG_MAIN_SEQUELIZE, PG_SUB_SEQUELIZE } from '@/common/constants';

import { Post, User } from './pg-main/models';
import { Role } from './pg-sub/models';

/**
 * https://docs.nestjs.com/techniques/database#sequelize-integration
 */
export const sequelizeModules = [
  SequelizeModule.forRootAsync({
    name: PG_MAIN_SEQUELIZE,
    useFactory: (configService: ConfigService) => {
      const databaseURL = configService.getOrThrow<string>('database.postgres.main');
      return {
        dialect: 'postgres',
        uri: databaseURL,
        models: [User, Post],
        define: {
          underscored: true,
        },
      };
    },
    inject: [ConfigService],
  }),
  SequelizeModule.forRootAsync({
    name: PG_SUB_SEQUELIZE,
    useFactory: (configService: ConfigService) => {
      const databaseURL = configService.getOrThrow<string>('database.postgres.sub');
      return {
        dialect: 'postgres',
        uri: databaseURL,
        models: [Role],
        define: {
          underscored: true,
        },
      };
    },
    inject: [ConfigService],
  }),
];
