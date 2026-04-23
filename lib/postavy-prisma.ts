import { prisma } from './db';
import { Postava } from '@prisma/client';
import { put, del } from '@vercel/blob';

import withRetry from './with-retry';

import type { PostavaType } from '@/types/types';

export async function getPostavy(): Promise<Postava[]> {
  return withRetry(() =>
    prisma.postava.findMany({
      orderBy: {
        jmeno: 'asc',
      },
    }),
  );
}

export async function uploadImage(image: File, order: number) {
  const env = process.env.NODE_ENV;
  const extension = image.name.split('.').pop() as string;
  const fileName = `${env}/postavy/postava_${order}.${extension}`;
  const blob = await put(fileName, image, {
    access: 'public',
    allowOverwrite: true,
  });

  return blob.url;
}

export async function SavePostavy(postava: PostavaType, imageUrl: string) {
  await prisma.postava.create({
    data: {
      ...postava,
      image: imageUrl,
    },
  });
}
export async function UpdatePostavy(
  postava: PostavaType,
  imageUrl: string,
  id: string,
) {
  await prisma.postava.update({
    where: { id },
    data: {
      ...postava,
      image: imageUrl,
    },
  });
}
/*export async function UpdatePostavy(
  postava: PostavaType,
  image: File,
  id: string,
) {
  const env = process.env.NODE_ENV;
  const extension = image.name.split('.').pop() as string;
  const fileName = `${env}/postavy/postava_${postava.order}.${extension}`;

  const existing = await prisma.postava.findUnique({
    where: { id },
  });
  if (!existing) {
    return { message: 'Postava neexistuje' };
  }

  let imageUrl = existing.image;

  if (image && image.size > 0) {
    const blob = await put(fileName, image, {
      access: 'public',
    });

    imageUrl = blob.url;
    if (existing.image) {
      try {
        await del(existing.image);
      } catch (err) {
        console.log('Nepodařilo se smazat starý obrázek:', err);
      }
    }
  }

  await prisma.postava.update({
    where: { id },
    data: {
      ...postava,
      image: imageUrl,
    },
  });
}*/

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
