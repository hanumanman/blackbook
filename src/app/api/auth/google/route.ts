import { google } from '@/lib/auth/google';
import { generateCodeVerifier, generateState } from 'arctic';
import { cookies } from 'next/headers';

// Generate a new state and code verifier, and create a new authorization URL.
// Add the openid and profile scope to have access to the user's profile later on.
// Store the state and code verifier, and redirect the user to the authorization URL.
// The user will be redirected to Google's sign in page.
export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'profile']);

  const cookieStore = await cookies();
  cookieStore.set('google_oauth_state', state, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax',
  });
  cookieStore.set('google_code_verifier', codeVerifier, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax',
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
