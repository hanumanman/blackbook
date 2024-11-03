'use server';

import { db } from '@/db';
import { sessionTable, TSession, TUser, userTable } from '@/db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const FIFTEEN_DAYS = 15 * 24 * 60 * 60 * 1000;

export async function login() {
  alert('login');
}

export async function logout() {
  alert('logout');
}

export type SessionValidationResult =
  | {
      user: TUser;
      session: TSession;
    }
  | {
      session: null;
      user: null;
    };

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: number): Promise<TSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: TSession = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + THIRTY_DAYS),
  };
  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length === 0) {
    return {
      session: null,
      user: null,
    };
  }
  const { session, user } = result[0];

  //extend session exp date
  if (Date.now() > session.expiresAt.getTime() - FIFTEEN_DAYS) {
    session.expiresAt = new Date(Date.now() + THIRTY_DAYS);
    await db.update(sessionTable).set({ expiresAt: session.expiresAt }).where(eq(sessionTable.id, sessionId));
  }
  return {
    session,
    user,
  };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}
