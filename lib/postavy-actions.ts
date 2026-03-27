'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import { SavePostavy } from '@/lib/postavy-prisma';
import { UpdatePostavy } from '@/lib/postavy-prisma';
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
  const id = formData.get('id') as string | null;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { message: 'Nepřihlášený uživatel' };
  }
  const canCreate = permissions.canCreate({
    role: session.user.role,
  });

  if (!canCreate) {
    return { message: 'Nemáš přístup' };
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
    player: xss(formData.get('hrac') as string),
    content: formData.get('pribeh') as string,
    campaign: formData.get('tazeni') as string,
    order: newOrder,
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
    isInvalidText(postava.player)
  ) {
    return { message: 'Neplatná data formuláře' };
  }
  if (id) {
    await UpdatePostavy(postava, imageFile, id);
  } else {
    await SavePostavy(postava, imageFile);
  }
  revalidatePath('/postavy');
  redirect('/postavy');
}

export async function deleteAction(formData: FormData) {
  const id = formData.get('id') as string;
  await DeletePostavy(id);
  revalidatePath('/postavy');
  redirect('/postavy');
}
