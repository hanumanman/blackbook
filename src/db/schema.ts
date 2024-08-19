import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const chaptersTable = sqliteTable('chapters', {
  id: integer('id').primaryKey(),
  chapter_name: text('chapter_name').notNull(),
  chapter_content: text('chapter_content').notNull(),
  novel_name: text('novel_name').notNull(),
  chapter_number: integer('chapter_number').notNull(),
});

export const novelsTable = sqliteTable('novels', {
  id: integer('id').primaryKey(),
  novel_name: text('novel_name').notNull(),
  novel_description: text('novel_description').notNull(),
  novel_author: text('novel_author').notNull(),
  novel_genre: text('novel_genre').notNull(),
  novel_image_link: text('novel_image_link'),
});

export type InsertChapter = typeof chaptersTable.$inferInsert;
export type InsertNovel = typeof novelsTable.$inferInsert;

export type SelectChapter = typeof chaptersTable.$inferSelect;
export type SelectNovel = typeof novelsTable.$inferSelect;
