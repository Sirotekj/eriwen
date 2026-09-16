'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import {
  SavePostavy,
  UpdatePostavy,
  DeletePostavy,
} from '@/lib/postavy-prisma';

import { FormState } from '@/types/types';
import { isInvalidText, parseImageMultiply } from '@/lib/helpers';
import { uploadImage } from '@/lib/upload-image';

export async function createAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawId = formData.get('id') as string | null;
  const id = rawId && rawId !== '' ? (rawId as string) : null;
  const session = await getServerSession(authOptions);

  const errors: string[] = [];
  const messages: string[] = [];

  if (!session?.user) {
    errors.push('Nepřihlášený uživatel!');
    return { messages, errors };
  }
  const canCreate = permissions.canCreate({
    role: session.user.role,
  });

  if (!canCreate) {
    errors.push('Nemáš přístup!');
    return { messages, errors };
  }

  let order: number;
  if (id) {
    const existing = await prisma.postava.findUnique({
      where: { id },
      select: { order: true },
    });
    if (!existing) {
      errors.push('Záznam pro "order" nenalezen!');
      return { messages, errors };
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
    imageUrl = await uploadImage({
      image: imageFile,
      fileName: 'postava',
      order: order.toString(),
      url: `/postavy`,
    });
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
    imageMultiply: parseImageMultiply(formData),
    author: {
      connect: {
        id: session.user.id,
      },
    },
  };
  if (isInvalidText(postava.jmeno)) {
    messages.push('Chybí jméno!');
  }
  if (isInvalidText(postava.rasa)) {
    messages.push('Chybí rasa!');
  }
  if (isInvalidText(postava.povolani)) {
    messages.push('Chybí povolání!');
  }
  if (isInvalidText(postava.hrac)) {
    messages.push('Chybí hráč!');
  }
  if (messages.length > 0) {
    return { messages, errors };
  }

  if (id) {
    await UpdatePostavy(postava, imageUrl, id);
  } else {
    await SavePostavy(postava, imageUrl);
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
