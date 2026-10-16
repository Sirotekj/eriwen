import { randomBytes } from 'crypto';

import { prisma } from '@/lib/prisma';

const SESSION_DAYS = 30;

export type GoogleIdTokenPayload = {
  sub: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
  aud?: string;
  exp?: string;
};

export type MobileAuthErrorCode =
  | 'INVALID_TOKEN'
  | 'UNKNOWN_USER'
  | 'GOOGLE_ACCOUNT_NOT_LINKED';

export class MobileAuthError extends Error {
  constructor(
    public readonly code: MobileAuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'MobileAuthError';
  }
}

function getAllowedGoogleAudiences(): string[] {
  return [
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_IOS_CLIENT_ID,
    process.env.GOOGLE_ANDROID_CLIENT_ID,
  ].filter((value): value is string => Boolean(value));
}

export async function verifyGoogleIdToken(
  idToken: string,
): Promise<GoogleIdTokenPayload> {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
  );

  if (!response.ok) {
    throw new MobileAuthError('INVALID_TOKEN', 'Neplatný Google idToken.');
  }

  const payload = (await response.json()) as GoogleIdTokenPayload;
  const allowedAudiences = getAllowedGoogleAudiences();

  if (!payload.sub || !payload.aud) {
    throw new MobileAuthError('INVALID_TOKEN', 'Neplatný Google idToken.');
  }

  if (
    allowedAudiences.length > 0 &&
    !allowedAudiences.includes(payload.aud)
  ) {
    throw new MobileAuthError('INVALID_TOKEN', 'Neplatný Google idToken.');
  }

  if (payload.exp && Number(payload.exp) * 1000 < Date.now()) {
    throw new MobileAuthError('INVALID_TOKEN', 'Neplatný Google idToken.');
  }

  const emailVerified =
    payload.email_verified === true || payload.email_verified === 'true';

  if (!payload.email || !emailVerified) {
    throw new MobileAuthError('INVALID_TOKEN', 'Neplatný Google idToken.');
  }

  return payload;
}

/**
 * Only existing users with a linked Google Account can sign in from mobile.
 * No auto-create / auto-link — user must already exist from web NextAuth Google login.
 */
export async function findExistingGoogleUser(payload: GoogleIdTokenPayload) {
  const existingAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: 'google',
        providerAccountId: payload.sub,
      },
    },
    include: { user: true },
  });

  if (existingAccount) {
    return existingAccount.user;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
    include: {
      accounts: {
        where: { provider: 'google' },
        select: { id: true },
      },
    },
  });

  if (!existingUser) {
    throw new MobileAuthError(
      'UNKNOWN_USER',
      'Účet s tímto Google emailem v databázi neexistuje.',
    );
  }

  throw new MobileAuthError(
    'GOOGLE_ACCOUNT_NOT_LINKED',
    'Účet existuje, ale nemá spárovaný Google Account. Nejdřív se přihlas na webu přes Google.',
  );
}

export async function createMobileSession(userId: string) {
  const sessionToken = randomBytes(32).toString('hex');
  const expires = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  );

  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  });

  return { sessionToken, expires };
}

export async function deleteMobileSession(sessionToken: string) {
  await prisma.session.deleteMany({
    where: { sessionToken },
  });
}
