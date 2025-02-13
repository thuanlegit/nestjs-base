import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './src/database/postgres/main/schema',
  out: './drizzle/postgres/main',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['POSTGRES_MAIN_DATABASE_URL'] || '',
  },
  schemaFilter: ['public'], // Optional: Filter which schemas to include,
  migrations: {
    schema: 'drizzle', // Optional: Specify a different schema for migrations
  },
  strict: false,
});
