import { NextResponse } from 'next/server';

import { permissions } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

import {
  enemySelect,
  getAuthUser,
  parseEnemyRequest,
} from '@/app/api/enemies/helpers';

export async function GET(request: Request) {
  const user = await getAuthUser(request);

  const enemies = await prisma.nepritel.findMany({
    where:
      user === null
        ? { isPublic: true }
        : user.role === 'ADMIN'
          ? {}
          : { OR: [{ isPublic: true }, { authorId: user.id }] },
    orderBy: { name: 'asc' },
    select: enemySelect,
  });

  return NextResponse.json(enemies);
}

export async function POST(request: Request) {
  const user = await getAuthUser(request);
  if (user === null) {
    return NextResponse.json(
      { error: 'Nepřihlášený uživatel.' },
      { status: 401 },
    );
  }

  if (!permissions.canCreate({ role: user.role })) {
    return NextResponse.json({ error: 'Nemáš přístup.' }, { status: 403 });
  }

  const parsed = await parseEnemyRequest(request);
  if (parsed.error || !parsed.data) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const enemy = await prisma.nepritel.create({
    data: {
      ...parsed.data,
      authorId: user.id,
    },
    select: enemySelect,
  });

  return NextResponse.json(enemy, { status: 201 });
}
