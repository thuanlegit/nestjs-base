import type { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
  pg_main: {
    client: 'postgresql',
    connection: process.env['POSTGRES_MAIN_DATABASE_URL'],
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
    connection: process.env['POSTGRES_SUB_DATABASE_URL'],
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
