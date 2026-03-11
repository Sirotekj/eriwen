import { prisma } from './db';
import { Postava } from '@prisma/client';
//import fs from 'node:fs';
import fs from 'fs/promises';
import path from 'path';
import withRetry from './with-retry';

import type { PostavaType } from '@/types/types';

export async function getPostavy(): Promise<Postava[]> {
  return withRetry(() =>
    prisma.postava.findMany({
      orderBy: {
        name: 'asc',
      },
    }),
  );
}

export async function SavePostavy(postava: PostavaType, image: File) {
  const extension = image.name.split('.').pop() as string;
  const fileName = `postava_${postava.order}.${extension}`;

  const filePath = path.join(process.cwd(), 'public/images/postavy', fileName);
  const buffer = Buffer.from(await image.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  const imageUrl = `/images/postavy/${fileName}`;
  console.log(imageUrl);
  await prisma.postava.create({
    data: {
      ...postava,
      image: imageUrl,
    },
  });
}

export async function DeletePostavy(id: string) {
  // Najdeme postavu v DB
  const postava = await prisma.postava.findUnique({
    where: { id },
  });

  if (!postava) {
    throw new Error('Postava nebyla nalezena');
  }

  // Pokud má obrázek, smažeme ho z disku
  if (postava.image) {
    const filePath = path.join(process.cwd(), 'public', postava.image);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Obrázek se nepodařilo smazat:', err);
    }
  }

  // Smazání z databáze
  await prisma.postava.delete({
    where: { id },
  });
}
