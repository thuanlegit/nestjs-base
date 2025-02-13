import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const createPostgresClient = (databaseURL: string, schema: any) => {
  const pool = new Pool({
    connectionString: databaseURL,
  });
  return drizzle(pool, { schema, casing: 'snake_case' }) as NodePgDatabase<
    typeof schema
  >;
};
