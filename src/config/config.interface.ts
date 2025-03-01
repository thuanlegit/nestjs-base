import { APP_ENV } from 'src/common/constants';

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
  database: DatabaseConfig;
}

export interface NestConfig {
  env: APP_ENV;
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
  username: string;
  password: string;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface DatabaseConfig {
  postgres: {
    main: string;
    sub: string; // example of multi-db
  };
}
