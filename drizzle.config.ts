import { getEnv } from '@/lib/utils';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

const [url, authToken] = getEnv(['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN']);

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url,
    authToken,
  },
});
