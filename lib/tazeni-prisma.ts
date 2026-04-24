import { prisma } from './db';
import { Tazeni } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { put, del } from '@vercel/blob';

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

export async function uploadImage(image: File, order: number) {
  const env = process.env.NODE_ENV;
  const extension = image.name.split('.').pop() as string;
  const fileName = `${env}/tazeni/tazeni_${order}.${extension}`;
  const blob = await put(fileName, image, {
    access: 'public',
    allowOverwrite: true,
  });

  return blob.url;
}

export async function SaveTazeni(tazeni: TazeniType, image: File) {
  const extension = image.name.split('.').pop() as string;
  const fileName = `tazeni_${tazeni.order}.${extension}`;
  const filePath = path.join(process.cwd(), 'public/images/tazeni', fileName);
  const buffer = Buffer.from(await image.arrayBuffer());

  await fs.writeFile(filePath, buffer);
  const imageUrl = `/images/tazeni/${fileName}`;

  await prisma.tazeni.create({
    data: {
      ...tazeni,
      image: imageUrl,
    },
  });
}

export async function UpdateTazeni(
  tazeni: TazeniType,
  imageUrl: string,
  id: string,
) {
  await prisma.tazeni.update({
    where: { id },
    data: {
      ...tazeni,
      image: imageUrl,
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
