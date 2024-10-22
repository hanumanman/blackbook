import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => NextResponse.json({ message: 'Invalid JSON' }, { status: 400 }));

  return NextResponse.json({ message: 'Hello World!', body });
  // return NextResponse.json({ message: 'Hello Error!', body }, { status: 500 });
}
