import { NextResponse } from 'next/server';

import { permissions } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

import {
  enemySelect,
  getAuthUser,
  parseEnemyRequest,
} from '@/app/api/enemies/helpers';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const user = await getAuthUser(request);
  if (user === null) {
    return NextResponse.json(
      { error: 'Nepřihlášený uživatel.' },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  const existing = await prisma.nepritel.findUnique({
    where: { id },
    select: { id: true, authorId: true, image: true },
  });

  if (existing === null) {
    return NextResponse.json({ error: 'Nepřítel nenalezen.' }, { status: 404 });
  }

  if (
    !permissions.canEdit({
      role: user.role,
      userId: user.id,
      authorId: existing.authorId,
    })
  ) {
    return NextResponse.json({ error: 'Nemáš přístup.' }, { status: 403 });
  }

  const parsed = await parseEnemyRequest(request);
  if (parsed.error || !parsed.data) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const enemy = await prisma.nepritel.update({
    where: { id },
    data: {
      ...parsed.data,
      // když nepřijde nový ani existing image, nech původní
      image: parsed.data.image ?? existing.image,
    },
    select: enemySelect,
  });

  return NextResponse.json(enemy);
}

export async function DELETE(request: Request, context: RouteContext) {
  const user = await getAuthUser(request);
  if (user === null) {
    return NextResponse.json(
      { error: 'Nepřihlášený uživatel.' },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  const existing = await prisma.nepritel.findUnique({
    where: { id },
    select: { id: true, authorId: true },
  });

  if (existing === null) {
    return NextResponse.json({ error: 'Nepřítel nenalezen.' }, { status: 404 });
  }

  if (
    !permissions.canDelete({
      role: user.role,
      userId: user.id,
      authorId: existing.authorId,
    })
  ) {
    return NextResponse.json({ error: 'Nemáš přístup.' }, { status: 403 });
  }

  await prisma.nepritel.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
