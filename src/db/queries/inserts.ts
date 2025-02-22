import { db } from '..';
import { usersTable } from '../schema';

export async function createUser(googleId: number, username: string, imageUrl?: string) {
  const [createdUser] = await db
    .insert(usersTable)
    .values({
      google_id: googleId,
      user_name: username,
      image: imageUrl,
    })
    .returning();

  return createdUser;
}
