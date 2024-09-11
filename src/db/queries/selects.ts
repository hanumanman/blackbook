'use server';
import { and, eq, like, or } from 'drizzle-orm';
import { db } from '..';
import { chaptersTable, novelsTable } from '../schema';
import { normalize } from 'path';
import { normalizeVietnamese } from '@/lib/utils';

export async function getAllNovels() {
  return await db.select().from(novelsTable);
}

export async function getChapter({
  novelID,
  chapter,
}: {
  novelID: number;
  chapter: number;
}) {
  const res = await db
    .select()
    .from(chaptersTable)
    .where(
      and(
        eq(chaptersTable.novel_id, novelID),
        eq(chaptersTable.chapter_number, chapter)
      )
    )
    .limit(1);
  return res[0];
}

export async function getTableOfContents({
  novelID,
  offset,
  limit,
  searchTerm = '',
}: {
  novelID: number;
  offset: number;
  limit: number;
  searchTerm?: string;
}) {
  //TODO: fix normaize searchTerm not working
  const normalizedTerm = normalizeVietnamese(searchTerm);
  return await db
    .select()
    .from(chaptersTable)
    .orderBy(chaptersTable.chapter_number)
    .where(
      and(
        eq(chaptersTable.novel_id, novelID),
        or(
          like(chaptersTable.chapter_name, `%${normalizedTerm}%`),
          like(chaptersTable.chapter_number, `%${normalizedTerm}%`)
        )
      )
    )
    .limit(limit)
    .offset(offset);
}

export type TNovels = Awaited<ReturnType<typeof getAllNovels>>;
export type TNovel = TNovels[0];
export type TChapter = Awaited<ReturnType<typeof getChapter>>;
