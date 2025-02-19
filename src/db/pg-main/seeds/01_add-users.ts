import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  await knex('user').insert([
    { id: 1, name: 'Thuan Le', email: 'dthuanle.20@gmail.com', password: '123456' },
    { id: 2, name: 'Le Duc Thuan', email: 'leducthuan@gmail.com', password: '123456' },
    { id: 3, name: 'Duc Thuan', email: 'ducthuan@gmail.com', password: '123456' },
  ]);
}
