import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

const url = process.env.TURSO_DATABASE_URL;
if (!url) throw new Error('Cannot find TURSO_DATABASE_URL in env');

const authToken = process.env.TURSO_AUTH_TOKEN;
if (!authToken) throw new Error('Cannot find TURSO_AUTH_TOKEN in env');

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
