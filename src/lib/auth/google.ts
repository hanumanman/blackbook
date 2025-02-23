import { Google } from 'arctic';
import { getEnv } from '../utils';

const [clientId, clientSecret] = getEnv(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']);
const baseUrl = getEnv('BASE_URL');

export const google = new Google(clientId, clientSecret, `${baseUrl}/auth/google/callback`);

export type GoogleClaim = {
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  iss: string;
  sub: number;
};
