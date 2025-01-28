import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const chaptersTable = sqliteTable('chapters', {
  id: integer('id').primaryKey(),
  chapter_name: text('chapter_name').notNull(),
  chapter_name_normalized: text('chapter_name_normalized').notNull(),
  chapter_content: text('chapter_content').notNull(),
  novel_id: integer('novel_id').notNull(),
  chapter_number: integer('chapter_number').notNull(),
});
export type TInsertChapter = typeof chaptersTable.$inferInsert;
export type TSelectChapter = typeof chaptersTable.$inferSelect;

export const novelsTable = sqliteTable('novels', {
  id: integer('id').primaryKey(),
  novel_name: text('novel_name').notNull(),
  novel_description: text('novel_description').notNull(),
  novel_author: text('novel_author').notNull(),
  novel_genre: text('novel_genre').notNull(),
  novel_image_link: text('novel_image_link'),
});
export type TInsertNovel = typeof novelsTable.$inferInsert;
export type TSelectNovel = typeof novelsTable.$inferSelect;

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  user_name: text('user_name').notNull(),
  user_email: text('user_email').notNull(),
});
export type TInsertUser = typeof usersTable.$inferInsert;
export type TSelectUser = typeof usersTable.$inferSelect;

export const sessionTable = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
});
export type TInsertSession = typeof sessionTable.$inferInsert;
export type TSelectSession = typeof sessionTable.$inferSelect;

export const progressTable = sqliteTable('progress', {
  id: text('id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  novel_id: integer('novel_id')
    .notNull()
    .references(() => novelsTable.id),
  last_chapter_id: integer('last_chapter_id')
    .notNull()
    .references(() => chaptersTable.id),
});
export type TInsertProgress = typeof progressTable.$inferInsert;
export type TSelectProgress = typeof progressTable.$inferSelect;
