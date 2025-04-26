import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Tournaments } from '../types';

export const lastTournaments = sqliteTable('lastTournaments', {
    id: integer('id').primaryKey(),
    data: text('data', {mode: 'json'}).$type<Tournaments>().notNull(),
});