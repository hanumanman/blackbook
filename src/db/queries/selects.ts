import { db } from '..';
import { novelsTable } from '../schema';

export async function getAllNovels() {
  return await db.select().from(novelsTable);
}

export type TNovels = Awaited<ReturnType<typeof getAllNovels>>;
export type TNovel = TNovels[0];
