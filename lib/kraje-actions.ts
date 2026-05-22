'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import { LokalitaUroven } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import {
  SaveLokalita,
  UpdateLokalita,
  DeleteLokalita,
} from '@/lib/kraje-prisma';

import { FormState } from '@/types/types';
import { isInvalidText } from '@/lib/helpers';
import { validateHierarchy } from './hierarchy-validation';
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
    const existing = await prisma.lokalita.findUnique({
      where: { id },
      select: { order: true },
    });
    if (!existing) {
      errors.push('Záznam pro "order" nenalezen!');
      return { messages, errors };
    }
    order = existing.order;
  } else {
    const lastLokalita = await prisma.lokalita.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    order = lastLokalita ? lastLokalita.order + 100 : 100;
  }

  const imageFile = formData.get('image') as File | null;
  const existingImage = formData.get('existingImage') as string | null;
  let imageUrl: string | undefined;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage({
      image: imageFile,
      fileName: 'kraje', //kategorie.toLowerCase(),
      order: order.toString(),
      url: '/svet/kraje',
    });
  } else if (existingImage) {
    imageUrl = existingImage;
  } else {
    imageUrl = undefined;
  }

  const parentIdRaw = formData.get('parentId');
  const parentId =
    typeof parentIdRaw === 'string' && parentIdRaw !== '' ? parentIdRaw : null;

  const lokalita = {
    nazev: formData.get('nazev') as string,
    popis: xss(formData.get('popis') as string),
    uroven: formData.get('uroven') as LokalitaUroven,
    order: order,
    parentId: parentId,
    authorId: session.user.id,
  };
  if (isInvalidText(lokalita.nazev)) {
    messages.push('Chybí název!');
    return { messages, errors };
  }

  const validation = await validateHierarchy(
    'lokalita',
    lokalita.uroven,
    lokalita.parentId,
  );

  if (!validation.valid) {
    messages.push(validation.message);
    return {
      messages,
      errors,
    };
  }

  if (id) {
    await UpdateLokalita(lokalita, imageUrl, id);
  } else {
    await SaveLokalita(lokalita, imageUrl);
  }

  revalidatePath('/svet/kraje-a-mista');
  redirect('/svet/kraje-a-mista');
}

export async function deleteAction(formData: FormData) {
  const id = formData.get('id') as string;
  await DeleteLokalita(id);
  revalidatePath('/svet/kraje-a-mista');
  redirect('/svet/kraje-a-mista');
}
