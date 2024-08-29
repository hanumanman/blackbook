import { and, eq } from 'drizzle-orm';
import { db } from '..';
import { chaptersTable, novelsTable } from '../schema';

export async function getAllNovels() {
  //TODO: Remove this timeout
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await db.select().from(novelsTable);
}

export async function getChapter({
  novelID,
  chapter,
}: {
  novelID: number;
  chapter: number;
}) {
  //TODO: Remove this timeout
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await db
    .select()
    .from(chaptersTable)
    .where(
      and(
        eq(chaptersTable.novel_id, novelID),
        eq(chaptersTable.chapter_number, chapter)
      )
    );
}

export type TNovels = Awaited<ReturnType<typeof getAllNovels>>;
export type TNovel = TNovels[0];
