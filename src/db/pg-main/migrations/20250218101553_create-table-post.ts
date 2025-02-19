import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('post', table => {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(
        knex.fn.now().on('update', _ => {
          knex.fn.now();
        }),
      );

    table.integer('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('post');
}
