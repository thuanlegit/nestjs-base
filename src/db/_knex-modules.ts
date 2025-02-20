import { ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

import { PG_MAIN_KNEX, PG_SUB_KNEX } from '@/common/constants';
import { postProcessResponseToCamelCase, wrapIdentifierToSnakeCase } from '@/utils';

export const knexModules = [
  KnexModule.forRootAsync(
    {
      useFactory: (configService: ConfigService) => {
        const databaseURL = configService.getOrThrow<string>('database.postgres.main');
        return {
          name: PG_MAIN_KNEX,
          config: {
            client: 'pg',
            connection: databaseURL,
          },
        };
      },
      inject: [ConfigService],
    },
    PG_MAIN_KNEX,
  ),
  KnexModule.forRootAsync(
    {
      useFactory: (configService: ConfigService) => {
        const databaseURL = configService.getOrThrow<string>('database.postgres.sub');
        return {
          name: PG_SUB_KNEX,
          config: {
            client: 'pg',
            connection: databaseURL,
            //? Add the bellow fields if your db uses snake-case naming convention
            postProcessResponse: (
              result: Record<string, any> | Record<string, any>[],
              _queryContext,
            ) => {
              return postProcessResponseToCamelCase(result);
            },
            wrapIdentifier: (value, origImpl) => {
              return wrapIdentifierToSnakeCase(value, origImpl);
            },
          },
        };
      },
      inject: [ConfigService],
    },
    PG_SUB_KNEX,
  ),
];
