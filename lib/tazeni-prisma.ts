import { prisma } from './db';
import { Tazeni } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

import withRetry from './with-retry';

import type { TazeniType } from '@/types/types';

export async function getTazeni(): Promise<Tazeni[]> {
  return withRetry(() =>
    prisma.tazeni.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
  );
}

export async function SaveTazeni(
  tazeni: TazeniType,
  imageUrl: string | undefined,
) {
  await prisma.tazeni.create({
    data: {
      ...tazeni,
      image: imageUrl ?? null,
    },
  });
}

export async function UpdateTazeni(
  tazeni: TazeniType,
  imageUrl: string | undefined,
  id: string,
) {
  await prisma.tazeni.update({
    where: { id },
    data: {
      ...tazeni,
      ...(imageUrl !== undefined && { image: imageUrl }),
    },
  });
}

export async function DeleteTazeni(id: string) {
  const tazeni = await prisma.tazeni.findUnique({
    where: { id },
  });

  if (!tazeni) {
    return { message: 'Tažení nebylo nalezeno!' };
  }

  if (tazeni.image) {
    const filePath = path.join(process.cwd(), 'public', tazeni.image);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Obrázek se nepodařilo smazat:', err);
    }
  }

  await prisma.tazeni.delete({
    where: { id },
  });
}
