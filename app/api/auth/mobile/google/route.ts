import { NextResponse } from 'next/server';

import {
  createMobileSession,
  findExistingGoogleUser,
  MobileAuthError,
  verifyGoogleIdToken,
} from '@/lib/auth-mobile';

/**
 * Mobile Google login for React Native.
 * Does NOT use /api/auth/[...nextauth] (browser OAuth + cookies).
 *
 * Body: { "idToken": "<Google ID token from mobile SDK>" }
 * Returns: { sessionToken, expires, user }
 * Auth for later requests: Authorization: Bearer <sessionToken>
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Neplatné JSON tělo požadavku.', code: 'BAD_REQUEST' },
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
      { error: 'Chybí povinné pole: idToken.', code: 'BAD_REQUEST' },
      { status: 400 },
    );
  }

  try {
    const payload = await verifyGoogleIdToken(idToken);
    const user = await findExistingGoogleUser(payload);
    const { sessionToken, expires } = await createMobileSession(user.id);

    return NextResponse.json({
      sessionToken,
      expires: expires.toISOString(),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof MobileAuthError) {
      const status =
        error.code === 'INVALID_TOKEN'
          ? 401
          : error.code === 'UNKNOWN_USER'
            ? 404
            : 403;

      return NextResponse.json(
        { error: error.message, code: error.code },
        { status },
      );
    }

    throw error;
  }
}
