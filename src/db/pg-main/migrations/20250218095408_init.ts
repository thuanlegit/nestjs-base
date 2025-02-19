import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').createTable('user', table => {
    table.increments('id').primary();
    table.string('name').nullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(
        knex.fn.now().on('update', _ => {
          knex.fn.now();
        }),
      );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
