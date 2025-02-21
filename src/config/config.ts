import { APP_ENV } from '@/common/constants';

import type { Config } from './config.interface';

export const config: Config = {
  nest: {
    env: process.env['APP_ENV'] ? (process.env['APP_ENV'] as APP_ENV) : APP_ENV.dev,
    port: parseInt(process.env['PORT'] || '3000'),
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled:
      (process.env['APP_ENV'] ? (process.env['APP_ENV'] as APP_ENV) : APP_ENV.dev) !== APP_ENV.prod,
    title: 'API Document',
    description: 'The nestjs API description',
    version: '1.0',
    path: 'docs',
    username: process.env['SWAGGER_USERNAME'] || 'username',
    password: process.env['SWAGGER_PASSWORD'] || 'password',
  },
  security: {
    expiresIn: '5m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  database: {
    postgres: {
      main: process.env['POSTGRES_MAIN_DATABASE_URL'] || '',
      sub: process.env['POSTGRES_SUB_DATABASE_URL'] || '',
    },
  },
};
