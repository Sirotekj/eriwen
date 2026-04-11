'use server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import { SaveTazeni } from '@/lib/tazeni-prisma';
import { DeleteTazeni } from '@/lib/tazeni-prisma';

import { FormState } from '@/types/types';

export async function createAction(
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
    return { message: 'Nemáš přístup' };
    //throw new Error('Forbidden');
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

  const tazeni = {
    jmeno: formData.get('jmeno') as string,
    vypravec: formData.get('vypravec') as string,
    obdobi: formData.get('obdobi') as string,
    postavy: formData.get('postavy') as string,
    pribeh: xss(formData.get('pribeh') as string),
    order: newOrder,
    //image: image.name as string,
    author: {
      connect: {
        id: session.user.id,
      },
    },
  };

  await SaveTazeni(tazeni, imageFile);
  revalidatePath('/tazeni');
  redirect('/tazeni');
}

export async function deleteAction(formData: FormData) {
  const id = formData.get('id') as string;
  await DeleteTazeni(id);
  revalidatePath('/tazeni');
  redirect('/tazeni');
}
