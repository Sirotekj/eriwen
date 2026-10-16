import { NextResponse } from 'next/server';

import {
  createMobileSession,
  findOrCreateGoogleUser,
  verifyGoogleIdToken,
} from '@/lib/auth-mobile';

/**
 * Mobile Google login for React Native.
 * Does NOT use /api/auth/[...nextauth] (that route is browser OAuth + cookies).
 *
 * Body: { "idToken": "<Google ID token from mobile SDK>" }
 * Returns: { token, expires, user } — send token as Authorization: Bearer <token>
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Neplatné JSON tělo požadavku.' },
      { status: 400 },
    );
  }

  const idToken =
    body !== null &&
    typeof body === 'object' &&
    'idToken' in body &&
    typeof (body as { idToken: unknown }).idToken === 'string'
      ? (body as { idToken: string }).idToken.trim()
      : '';

  if (!idToken) {
    return NextResponse.json(
      { error: 'Chybí povinné pole: idToken.' },
      { status: 400 },
    );
  }

  const payload = await verifyGoogleIdToken(idToken);
  if (payload === null) {
    return NextResponse.json(
      { error: 'Neplatný Google idToken.' },
      { status: 401 },
    );
  }

  const user = await findOrCreateGoogleUser(payload);
  const { sessionToken, expires } = await createMobileSession(user.id);

  return NextResponse.json({
    token: sessionToken,
    expires: expires.toISOString(),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
    },
  });
}
