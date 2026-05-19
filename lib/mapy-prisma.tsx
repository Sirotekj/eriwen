import { prisma } from './db';
import fs from 'fs/promises';
import path from 'path';

import { MapaInput } from '@/types/types';

import withRetry from './with-retry';

export async function getAllMapa() {
  const data = await withRetry(() =>
    prisma.mapa.findMany({
      orderBy: { nazev: 'asc' },
    }),
  );
  return data;
}
export async function SaveMapa(mapa: MapaInput, imageUrl?: string) {
  await prisma.mapa.create({
    data: {
      ...mapa,
      image: imageUrl ?? null,
    },
  });
}
export async function UpdateMapa(
  mapa: MapaInput,
  imageUrl: string | undefined,
  id: string,
) {
  await prisma.mapa.update({
    where: { id },
    data: {
      ...mapa,
      ...(imageUrl !== undefined && { image: imageUrl }),
    },
  });
}

export async function DeleteMapa(id: string) {
  const mapa = await prisma.mapa.findUnique({
    where: { id },
  });

  if (!mapa) {
    return { message: 'Místo nebylo nalezeno!' };
  }

  if (mapa.image) {
    const filePath = path.join(process.cwd(), 'public', mapa.image);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Obrázek se nepodařilo smazat:', err);
    }
  }

  await prisma.mapa.delete({
    where: { id },
  });
}
