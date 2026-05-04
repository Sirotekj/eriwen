import { prisma } from './db';
import { Prisma } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

import type { ClanekCreateInput } from '@/types/types';

import withRetry from './with-retry';

export async function getSpojenci() {
  const data = await withRetry(() =>
    prisma.clanek.findMany({
      where: { kategorie: 'SPOJENCI' },
      orderBy: { order: 'asc' },
    }),
  );

  return data.map((item) => ({
    ...item,
    order: item.order.toString(),
  }));
}

export async function getNepratele() {
  const data = await withRetry(() =>
    prisma.clanek.findMany({
      where: { kategorie: 'NEPRATELE' },
      orderBy: {
        order: 'asc',
      },
    }),
  );
  return data.map((item) => ({
    ...item,
    order: item.order.toString(),
  }));
}

export async function getNabozenstvi() {
  const data = await withRetry(() =>
    prisma.clanek.findMany({
      where: { kategorie: 'NABOZENSTVI' },
      orderBy: {
        order: 'asc',
      },
    }),
  );
  return data.map((item) => ({
    ...item,
    order: item.order.toString(),
  }));
}
export async function SaveClanek(
  clanek: ClanekCreateInput,
  imageUrl: string | undefined,
) {
  await prisma.clanek.create({
    data: {
      ...clanek,
      order: new Prisma.Decimal(clanek.order),
      image: imageUrl ?? null,
    },
  });
}

export async function UpdateClanek(
  clanek: ClanekCreateInput,
  imageUrl: string | undefined,
  id: string,
) {
  await prisma.clanek.update({
    where: { id },
    data: {
      ...clanek,
      order: new Prisma.Decimal(clanek.order),
      ...(imageUrl !== undefined && { image: imageUrl }),
    },
  });
}

export async function DeleteClanek(id: string) {
  const clanek = await prisma.clanek.findUnique({
    where: { id },
  });

  if (!clanek) {
    return { message: 'Tažení nebylo nalezeno!' };
  }

  if (clanek.image) {
    const filePath = path.join(process.cwd(), 'public', clanek.image);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Obrázek se nepodařilo smazat:', err);
    }
  }

  await prisma.clanek.delete({
    where: { id },
  });
}
