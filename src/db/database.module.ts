import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

import { PG_MAIN_DB, PG_SUB_DB } from '@/common/constants';
import { postProcessResponseToCamelCase, wrapIdentifierToSnakeCase } from '@/utils';

@Module({
  imports: [
    KnexModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => {
          const databaseURL = configService.getOrThrow<string>('database.postgres.main');
          return {
            config: {
              client: 'pg',
              connection: databaseURL,
            },
          };
        },
        inject: [ConfigService],
      },
      PG_MAIN_DB,
    ),
    KnexModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => {
          const databaseURL = configService.getOrThrow<string>('database.postgres.sub');
          return {
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
      PG_SUB_DB,
    ),
  ],
})
export class DatabaseModule {}
