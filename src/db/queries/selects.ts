'use server';

import { normalizeVietnamese } from '@/lib/utils';
import { and, eq, like, or } from 'drizzle-orm';
import { db } from '..';
import { chaptersTable, novelsTable, usersTable } from '../schema';

export async function getAllNovels() {
  return await db.select().from(novelsTable);
}

export async function getNovelFromId(id: number) {
  const result = await db.select().from(novelsTable).where(eq(novelsTable.id, id));
  return result[0];
}

export async function getChapter({ novelID, chapter_number }: { novelID: number; chapter_number: number }) {
  const res = await db
    .select()
    .from(chaptersTable)
    .where(and(eq(chaptersTable.novel_id, novelID), eq(chaptersTable.chapter_number, chapter_number)))
    .limit(1);
  return res[0];
}

export async function getTableOfContents({
  novelID,
  offset,
  limit,
  searchTerm,
}: {
  novelID: number;
  offset: number;
  limit: number;
  searchTerm?: string;
}) {
  return await db
    .select()
    .from(chaptersTable)
    .orderBy(chaptersTable.chapter_number)
    .where(
      and(
        eq(chaptersTable.novel_id, novelID),
        or(
          searchTerm ? like(chaptersTable.chapter_name_normalized, `%${normalizeVietnamese(searchTerm)}%`) : undefined,
          searchTerm ? like(chaptersTable.chapter_number, `%${searchTerm}%`) : undefined,
        ),
      ),
    )
    .limit(limit)
    .offset(offset);
}

export type TNovels = Awaited<ReturnType<typeof getAllNovels>>;
export type TNovel = TNovels[0];
export type TChapter = Awaited<ReturnType<typeof getChapter>>;

export async function getUserFromGoogleId(googleId: number) {
  const existingUser = await db.select().from(usersTable).where(eq(usersTable.google_id, googleId)).limit(1);

  if (existingUser.length > 0) {
    return existingUser[0];
  } else {
    return null;
  }
}
