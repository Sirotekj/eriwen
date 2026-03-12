import { prisma } from './db';
import { Postava } from '@prisma/client';
import { put, del } from '@vercel/blob';

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

  const blob = await put(fileName, image, {
    access: 'public',
  });
  const imageUrl = blob.url;

  await prisma.postava.create({
    data: {
      ...postava,
      image: imageUrl,
    },
  });
}

export async function DeletePostavy(id: string) {
  const postava = await prisma.postava.findUnique({
    where: { id },
  });

  if (!postava) {
    return { message: 'Postava nebyla nalezena!' };
  }

  if (postava.image) {
    try {
      await del(postava.image);
    } catch (err) {
      console.warn('Obrázek se nepodařilo smazat:', err);
    }
  }

  await prisma.postava.delete({
    where: { id },
  });
}
