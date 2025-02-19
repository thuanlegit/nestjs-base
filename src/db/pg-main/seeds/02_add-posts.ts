import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('post').del();

  // Inserts seed entries
  await knex('post').insert([
    { title: 'Another lonely valentine', content: 'I have been waiting for you', user_id: 1 },
    { title: 'Another lonely 8/3', content: 'I still waiting for you', user_id: 1 },
    { title: 'Another lonely 20/10', content: `Yep! I'm tired of waiting`, user_id: 2 },
  ]);
}
