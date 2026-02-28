'use server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { SavePostavy } from '@/lib/postavy';

import { FormState } from '@/types/types';

function isInvalidText(text: string | null) {
  return !text || text.trim() === '';
}

export async function createPostava(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { message: 'Nepřihlášený uživatel' };
  }
  const canCreate = permissions.canCreate({
    role: session.user.role,
  });

  if (!canCreate) {
    throw new Error('Nemáš přístup');
  }
  const lastPostava = await prisma.postava.findFirst({
    orderBy: {
      order: 'desc',
    },
    select: {
      order: true,
    },
  });
  const newOrder = lastPostava ? lastPostava.order + 100 : 100;

  const postava = {
    name: formData.get('jmeno') as string,
    race: formData.get('rasa') as string,
    profession: formData.get('povolani') as string,
    content: formData.get('pribeh') as string,
    campaign: formData.get('tazeni') as string,
    order: newOrder,
    image: formData.get('image') as File,
    author: {
      connect: {
        id: session.user.id,
      },
    },
  };
  if (
    isInvalidText(postava.name) ||
    isInvalidText(postava.race) ||
    isInvalidText(postava.profession) ||
    isInvalidText(postava.content) ||
    isInvalidText(postava.campaign) ||
    !postava.image ||
    postava.image.size === 0
  ) {
    return { message: 'Neplatná data formuláře' };
  }

  await SavePostavy(postava);
  revalidatePath('/postavy');
  redirect('/postavy');
}
