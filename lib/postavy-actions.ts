'use server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { SavePostavy } from '@/lib/postavy-prisma';
import { DeletePostavy } from '@/lib/postavy-prisma';

import { FormState } from '@/types/types';

function isInvalidText(text: string | null) {
  return !text || text.trim() === '';
}

export async function createAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  console.log('server action start');
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { message: 'Nepřihlášený uživatel' };
  }
  const canCreate = permissions.canCreate({
    role: session.user.role,
  });

  if (!canCreate) {
    return { message: 'Nemáš přístup' };
    //throw new Error('Nemáš přístup');
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

  const imageFile = formData.get('image') as File | null;
  if (!imageFile || imageFile.size === 0) {
    return { message: 'Chybí obrázek' };
  }

  const postava = {
    name: formData.get('jmeno') as string,
    race: formData.get('rasa') as string,
    profession: formData.get('povolani') as string,
    content: formData.get('pribeh') as string,
    campaign: formData.get('tazeni') as string,
    order: newOrder,
    //image: image.name as string,
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
    isInvalidText(postava.campaign)
  ) {
    return { message: 'Neplatná data formuláře' };
  }
  await SavePostavy(postava, imageFile);
  revalidatePath('/postavy');
  redirect('/postavy');
}
export async function deleteAction(id: string) {
  await DeletePostavy(id);
  revalidatePath('/postavy');
  redirect('/postavy');
}
