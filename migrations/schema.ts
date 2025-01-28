import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const novels = sqliteTable('novels', {
  id: integer('id').primaryKey().notNull(),
  novelName: text('novel_name').notNull(),
  novelDescription: text('novel_description').notNull(),
  novelAuthor: text('novel_author').notNull(),
  novelGenre: text('novel_genre').notNull(),
  novelImageLink: text('novel_image_link'),
});

export const chapters = sqliteTable('chapters', {
  id: integer('id').primaryKey().notNull(),
  chapterName: text('chapter_name').notNull(),
  chapterContent: text('chapter_content').notNull(),
  novelId: integer('novel_id').notNull(),
  chapterNumber: integer('chapter_number').notNull(),
  chapterNameNormalized: text('chapter_name_normalized').notNull(),
});

export const sessions = sqliteTable('sessions', {
  id: integer('id').primaryKey().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  expires: integer('expires').notNull(),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey().notNull(),
  userName: text('user_name').notNull(),
  userEmail: text('user_email').notNull(),
});

export const progress = sqliteTable('progress', {
  id: integer('id').primaryKey().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  novelId: integer('novel_id')
    .notNull()
    .references(() => novels.id),
  lastChapterId: integer('last_chapter_id')
    .notNull()
    .references(() => chapters.id),
});

