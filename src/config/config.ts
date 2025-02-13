import { APP_ENV } from 'src/common/constants';
import type { Config } from './config.interface';

const config: Config = {
  nest: {
    env: process.env['APP_ENV']
      ? (process.env['APP_ENV'] as APP_ENV)
      : APP_ENV.dev,
    port: parseInt(process.env['PORT'] || '3000'),
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled:
      (process.env['APP_ENV']
        ? (process.env['APP_ENV'] as APP_ENV)
        : APP_ENV.dev) !== APP_ENV.prod,
    title: 'API Document',
    description: 'The nestjs API description',
    version: '1.0',
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
    },
  },
};

export default (): Config => config;
