import {
  pgTable,
  uniqueIndex,
  serial,
  timestamp,
  text,
  foreignKey,
  boolean,
  varchar,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const role = pgEnum('Role', ['USER', 'ADMIN']);

export const user = pgTable(
  'user',
  {
    id: serial().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    email: text().notNull(),
    name: text(),
    role: role().default('USER').notNull(),
  },
  (table) => [
    uniqueIndex('user_email_key').using(
      'btree',
      table.email.asc().nullsLast().op('text_ops'),
    ),
  ],
);

export const post = pgTable(
  'post',
  {
    id: serial().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    published: boolean().default(false).notNull(),
    title: varchar({ length: 255 }).notNull(),
    authorId: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.authorId],
      foreignColumns: [user.id],
      name: 'post_authorId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);
