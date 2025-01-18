import { getEnv } from '@/lib/utils';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const [url, authToken] = getEnv(['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN']);

const tursoClient = createClient({
  url,
  authToken,
});

export const db = drizzle(tursoClient);
