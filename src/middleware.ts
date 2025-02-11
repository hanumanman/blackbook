import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest): Promise<NextResponse> {
  if (req.method === 'GET') {
    const response = NextResponse.next();
    const token = req.cookies.get('auth_session')?.value ?? null;
    if (token !== null) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set('auth_session', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }
    return response;
  }

  // CSRF protection
  const originHeader = req.headers.get('Origin');
  const hostHeader = req.headers.get('Host'); // NOTE: You may need to use 'X-Forwarded-Host' instead of 'Host' in some cases

  if (hostHeader === null || originHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch (error) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}
