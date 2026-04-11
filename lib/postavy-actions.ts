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
    jmeno: formData.get('jmeno') as string,
    rasa: formData.get('rasa') as string,
    povolani: formData.get('povolani') as string,
    hrac: formData.get('hrac') as string,
    popis: xss(formData.get('popis') as string),
    tazeni: formData.get('tazeni') as string,
    order: newOrder,
    author: {
      connect: {
        id: session.user.id,
      },
    },
  };
  if (
    isInvalidText(postava.jmeno) ||
    isInvalidText(postava.rasa) ||
    isInvalidText(postava.povolani) ||
    isInvalidText(postava.hrac)
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
