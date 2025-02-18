import * as dotenv from 'dotenv';

import { NODE_ENV } from '@/common/constants';

import type { Config } from './config.interface';

dotenv.config();

export const config: Config = {
  nest: {
    env: process.env['APP_ENV'] ? (process.env['APP_ENV'] as NODE_ENV) : NODE_ENV.dev,
    port: parseInt(process.env['PORT'] || '3000'),
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled:
      (process.env['APP_ENV'] ? (process.env['APP_ENV'] as NODE_ENV) : NODE_ENV.dev) !==
      NODE_ENV.prod,
    title: 'API Document',
    description: 'The nestjs API description',
    version: '0.0.1',
    path: 'api',
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
