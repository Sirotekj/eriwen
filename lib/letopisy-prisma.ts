import { prisma } from './db';
import { Letopisy } from '@prisma/client';

import withRetry from './with-retry';

import type { LetopisyType } from '@/types/types';

export async function getLetopisy(): Promise<Letopisy[]> {
  return withRetry(() => prisma.letopisy.findMany({}));
}

export async function SaveLetopisy(letopisy: LetopisyType) {
  await prisma.letopisy.create({
    data: {
      ...letopisy,
    },
  });
}

export async function UpdateLetopisy(letopisy: LetopisyType, id: string) {
  await prisma.letopisy.update({
    where: { id },
    data: {
      ...letopisy,
    },
  });
}

export async function DeleteLetopisy(id: string) {
  const letopisy = await prisma.letopisy.findUnique({
    where: { id },
  });

  if (!letopisy) {
    return { message: 'Událost nebyla nalezeno!' };
  }

  await prisma.letopisy.delete({
    where: { id },
  });
}
