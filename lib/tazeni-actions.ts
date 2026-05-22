'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { SaveTazeni, UpdateTazeni, DeleteTazeni } from '@/lib/tazeni-prisma';

import { FormState } from '@/types/types';
import { isInvalidText } from '@/lib/helpers';
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

  const afterOrderRaw = formData.get('afterOrder');
  const afterOrder = afterOrderRaw ? Number(afterOrderRaw) : undefined;

  let order: number;

  if (id) {
    const existing = await prisma.tazeni.findUnique({
      where: { id },
      select: { order: true },
    });

    if (!existing) {
      errors.push('Záznam pro "order" nenalezen!');
      return { messages, errors };
    }

    order = existing.order;
  } else if (afterOrder !== undefined) {
    const next = await prisma.tazeni.findFirst({
      where: {
        order: {
          gt: afterOrder,
        },
      },
      orderBy: {
        order: 'asc',
      },
      select: {
        order: true,
      },
    });
    if (next && next.order - afterOrder > 1) {
      order = Math.floor((afterOrder + next.order) / 2);
    } else if (next) {
      order = afterOrder + 100;
    } else {
      order = afterOrder + 100;
    }
  } else {
    const last = await prisma.tazeni.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    order = last ? last.order + 100 : 100;
  }

  const imageFile = formData.get('image') as File | null;
  const existingImage = formData.get('existingImage') as string | null;
  let imageUrl: string | undefined;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage({
      image: imageFile,
      fileName: 'tazeni',
      order: order.toString(),
      url: `/tazeni`,
    });
  } else if (existingImage) {
    imageUrl = existingImage;
  } else {
    imageUrl = undefined;
  }

  const tazeni = {
    jmeno: formData.get('jmeno') as string,
    vypravec: formData.get('vypravec') as string,
    obdobi: formData.get('obdobi') as string,
    postavy: formData.get('postavy') as string,
    pribeh: xss(formData.get('pribeh') as string),
    order: order,
    //image: image.name as string,
    author: {
      connect: {
        id: session.user.id,
      },
    },
  };
  if (isInvalidText(tazeni.jmeno)) {
    messages.push('Chybí jméno!');
  }
  if (isInvalidText(tazeni.vypravec)) {
    messages.push('Chybí vypravěč!');
  }
  if (isInvalidText(tazeni.postavy)) {
    messages.push('Chybí postavy!');
  }
  if (messages.length > 0) {
    return { messages, errors };
  }

  if (id) {
    await UpdateTazeni(tazeni, imageUrl, id);
  } else {
    await SaveTazeni(tazeni, imageUrl);
  }

  revalidatePath('/tazeni');
  redirect('/tazeni');
}

export async function deleteAction(formData: FormData) {
  const id = formData.get('id') as string;
  await DeleteTazeni(id);

  revalidatePath('/tazeni');
  redirect('/tazeni');
}
