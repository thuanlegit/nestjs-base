import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

export const PG_MAIN_DB = 'PG_MAIN_DB';

@Module({
  imports: [
    KnexModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => {
          const databaseURL = configService.getOrThrow<string>('database.postgres.main');
          return ({
          config: {
            client: 'pg',
            connection: databaseURL,
          }
        })},
        inject: [ConfigService],
      },
      PG_MAIN_DB,
    )
  ],
})
export class DatabaseModule {}
