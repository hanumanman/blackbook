// Check that the state in the URL matches the one that's stored.
// Then, validate the authorization code and stored code verifier.
// If you passed the openid and profile scope, Google will return a token ID with the user's profile.
// Check if the user is already registered; if not, create a new user. Finally, create a new session and set the session cookie to complete the authentication process.

import { createUser } from '@/db/queries/inserts';
import { getUserFromGoogleId } from '@/db/queries/selects';
import { createSession, generateSessionToken, setSessionCookie } from '@/lib/auth/auth';
import { google, GoogleClaim } from '@/lib/auth/google';
import { decodeIdToken, OAuth2Tokens } from 'arctic';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('google_oauth_state')?.value ?? null;
  const storedCodeVerifier = cookieStore.get('google_code_verifier')?.value ?? null;

  if (code === null || state === null || storedState === null || storedCodeVerifier === null) {
    return new Response('Invalid request', { status: 400 });
  }

  if (state !== storedState) {
    return new Response('Invalid request', { status: 400 });
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
  } catch (e) {
    return new Response('Invalid code or client credentials', { status: 400 });
  }

  const claims  = decodeIdToken(tokens.idToken()) as GoogleClaim;
  const googleUserId = claims.sub;
  const username = claims.name;
  const imageUrl = claims.picture;

  const existingUser = await getUserFromGoogleId(googleUserId);

  if (existingUser !== null) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    await setSessionCookie(sessionToken, session.expires);
    return new Response(null, { status: 302, headers: { Location: '/' } });
  }

  if (existingUser === null) {
    const user = await createUser(googleUserId, username, imageUrl);

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expires);

    return new Response(null, { status: 302, headers: { Location: '/' } });
  }
}
