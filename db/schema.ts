import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const lastTournaments = sqliteTable('lastTournaments', {
    id: integer('id').primaryKey(),
    data: text('data', {mode: 'json'}).notNull(),
});