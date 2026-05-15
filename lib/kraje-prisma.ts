import { prisma } from './db';
import fs from 'fs/promises';
import path from 'path';

import { LokalitaInput } from '@/types/types';

import withRetry from './with-retry';

export async function getAllLokalita() {
  const data = await withRetry(() =>
    prisma.lokalita.findMany({
      orderBy: { nazev: 'asc' },
    }),
  );
  return data;
}
export async function SaveLokalita(lokalita: LokalitaInput, imageUrl?: string) {
  await prisma.lokalita.create({
    data: {
      ...lokalita,
      image: imageUrl ?? null,
    },
  });
}
export async function UpdateLokalita(
  lokalita: LokalitaInput,
  imageUrl: string | undefined,
  id: string,
) {
  await prisma.lokalita.update({
    where: { id },
    data: {
      ...lokalita,
      ...(imageUrl !== undefined && { image: imageUrl }),
    },
  });
}

export async function DeleteLokalita(id: string) {
  const lokalita = await prisma.lokalita.findUnique({
    where: { id },
  });

  if (!lokalita) {
    return { message: 'Místo nebylo nalezeno!' };
  }

  if (lokalita.image) {
    const filePath = path.join(process.cwd(), 'public', lokalita.image);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Obrázek se nepodařilo smazat:', err);
    }
  }

  await prisma.lokalita.delete({
    where: { id },
  });
}
