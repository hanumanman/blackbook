import { db } from '..';
import { novelsTable } from '../schema';

export async function getAllNovels() {
  return await db.select().from(novelsTable);
}
