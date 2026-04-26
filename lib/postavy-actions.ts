'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import {
  SavePostavy,
  UpdatePostavy,
  DeletePostavy,
  uploadImage,
} from '@/lib/postavy-prisma';

import { FormState } from '@/types/types';

const isInvalidText = (text: string | null) => {
  return !text || text.trim() === '';
};

export async function createAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawId = formData.get('id') as string | null;
  const id = rawId && rawId !== '' ? (rawId as string) : null;
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

  let order: number;
  if (id) {
    const existing = await prisma.postava.findUnique({
      where: { id },
      select: { order: true },
    });
    if (!existing) {
      return { message: 'Záznam nenalezen' };
    }
    order = existing.order;
  } else {
    const lastPostava = await prisma.postava.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    order = lastPostava ? lastPostava.order + 100 : 100;
  }

  const imageFile = formData.get('image') as File | null;
  const existingImage = formData.get('existingImage') as string | null;
  let imageUrl: string | undefined;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile, order);
  } else if (existingImage) {
    imageUrl = existingImage;
  } else {
    imageUrl = undefined;
    //return { message: 'Chybí obrázek' };
  }

  const postava = {
    jmeno: formData.get('jmeno') as string,
    rasa: formData.get('rasa') as string,
    povolani: formData.get('povolani') as string,
    hrac: formData.get('hrac') as string,
    popis: xss(formData.get('popis') as string),
    tazeni: formData.get('tazeni') as string,
    order: order,
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
    await UpdatePostavy(postava, imageUrl, id);
  } else {
    await SavePostavy(postava, imageUrl);
  }

  revalidatePath('/postavy');
  redirect('/postavy');

  return { message: 'Vytvořeno' };
}

export async function deleteAction(formData: FormData) {
  const id = formData.get('id') as string;
  await DeletePostavy(id);
  revalidatePath('/postavy');
  redirect('/postavy');
}
