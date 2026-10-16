import { NextResponse } from 'next/server';

import { deleteMobileSession } from '@/lib/auth-mobile';

/**
 * Invalidates a mobile Bearer session token.
 * Header: Authorization: Bearer <token>
 */
export async function POST(request: Request) {
  const header = request.headers.get('authorization');
  const sessionToken = header?.startsWith('Bearer ')
    ? header.slice(7).trim()
    : '';

  if (!sessionToken) {
    return NextResponse.json(
      { error: 'Chybí Authorization Bearer token.' },
      { status: 400 },
    );
  }

  await deleteMobileSession(sessionToken);

  return NextResponse.json({ ok: true });
}
