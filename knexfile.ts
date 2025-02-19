import 'tsconfig-paths/register';

import type { Knex } from 'knex';

import { config } from '@/config';

const knexConfig: { [key: string]: Knex.Config } = {
  pg_main: {
    client: 'postgresql',
    connection: config.database.postgres.main,
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/pg-main/migrations',
    },
    seeds: {
      directory: './src/db/pg-main/seeds',
    },
  },
  pg_sub: {
    client: 'postgresql',
    connection: config.database.postgres.sub,
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/pg-sub/migrations',
    },
    seeds: {
      directory: './src/db/pg-sub/seeds',
    },
  },
};

module.exports = knexConfig;
