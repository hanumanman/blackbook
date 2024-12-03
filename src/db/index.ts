import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const url = process.env.TURSO_DATABASE_URL;
if (!url) throw new Error('Cannot find TURSO_DATABASE_URL in env');

const authToken = process.env.TURSO_AUTH_TOKEN;
if (!authToken) throw new Error('Cannot find TURSO_AUTH_TOKEN in env');

const tursoClient = createClient({
  url,
  authToken,
});

export const db = drizzle(tursoClient);
