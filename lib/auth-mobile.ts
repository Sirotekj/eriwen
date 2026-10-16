import { randomBytes } from 'crypto';
import { Role } from '@prisma/client';

import { prisma } from '@/lib/prisma';

const SESSION_DAYS = 30;

type GoogleIdTokenPayload = {
  sub: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
  aud?: string;
  exp?: string;
};

function getAllowedGoogleAudiences(): string[] {
  return [
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_IOS_CLIENT_ID,
    process.env.GOOGLE_ANDROID_CLIENT_ID,
  ].filter((value): value is string => Boolean(value));
}

export async function verifyGoogleIdToken(
  idToken: string,
): Promise<GoogleIdTokenPayload | null> {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as GoogleIdTokenPayload;
  const allowedAudiences = getAllowedGoogleAudiences();

  if (!payload.sub || !payload.aud) {
    return null;
  }

  if (
    allowedAudiences.length > 0 &&
    !allowedAudiences.includes(payload.aud)
  ) {
    return null;
  }

  if (payload.exp && Number(payload.exp) * 1000 < Date.now()) {
    return null;
  }

  const emailVerified =
    payload.email_verified === true || payload.email_verified === 'true';

  if (!payload.email || !emailVerified) {
    return null;
  }

  return payload;
}

export async function findOrCreateGoogleUser(payload: GoogleIdTokenPayload) {
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

  const existingUser = payload.email
    ? await prisma.user.findUnique({ where: { email: payload.email } })
    : null;

  if (existingUser) {
    await prisma.account.create({
      data: {
        userId: existingUser.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId: payload.sub,
      },
    });
    return existingUser;
  }

  return prisma.user.create({
    data: {
      email: payload.email,
      name: payload.name ?? null,
      image: payload.picture ?? null,
      emailVerified: new Date(),
      role: Role.READER,
      accounts: {
        create: {
          type: 'oauth',
          provider: 'google',
          providerAccountId: payload.sub,
        },
      },
    },
  });
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
