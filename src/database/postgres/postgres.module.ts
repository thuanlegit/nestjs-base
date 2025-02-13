import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPostgresClient } from '../clients/postgres.client';
import * as mainSchema from './main/schema';

export const POSTGRES_MAIN_DB = Symbol('POSTGRES_MAIN_DB');

@Global()
@Module({
  providers: [
    {
      provide: POSTGRES_MAIN_DB,
      useFactory: async (configService: ConfigService) => {
        const databaseURL =
          configService.get<string>('database.postgres.main') || '';
        return createPostgresClient(databaseURL, mainSchema);
      },
    },
  ],
  exports: [POSTGRES_MAIN_DB],
})
export class PostgresModule {}
