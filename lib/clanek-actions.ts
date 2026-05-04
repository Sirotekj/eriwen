'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { SaveClanek, UpdateClanek, DeleteClanek } from '@/lib/clanek-prisma';
import { uploadImage } from '@/lib/upload-image';

import { FormState } from '@/types/types';
import { isInvalidText } from '@/lib/helpers';
import { urlFromKategorie } from '@/lib/helpers';
import { Prisma, ClanekKategorie } from '@prisma/client';

import { calculateOrder } from './clanek-order';

export async function createAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawId = formData.get('id') as string | null;
  const id = rawId && rawId !== '' ? (rawId as string) : null;
  const kategorie = formData.get('kategorie') as ClanekKategorie;

  const afterOrderRaw = formData.get('afterOrder');
  const afterOrder = afterOrderRaw
    ? new Prisma.Decimal(afterOrderRaw as string)
    : undefined;

  const rawPosition = formData.get('position'); // start | end | undefined
  const position =
    rawPosition === 'start' || rawPosition === 'end' ? rawPosition : undefined;

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

  const order = await calculateOrder({
    category: kategorie,
    afterOrder,
    position,
  });

  const imageFile = formData.get('image') as File | null;
  const existingImage = formData.get('existingImage') as string | null;
  let imageUrl: string | undefined;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage({
      image: imageFile,
      fileName: kategorie.toLowerCase(),
      order: order.toString(),
      url: `/${urlFromKategorie(kategorie).menu}/${urlFromKategorie(kategorie).submenu}`,
    });
  } else if (existingImage) {
    imageUrl = existingImage;
  } else {
    imageUrl = undefined;
  }

  const clanek = {
    nazev: formData.get('nazev') as string,
    obsah: xss(formData.get('obsah') as string),
    order: order,
    kategorie: kategorie,
    //image: image.name as string,
    author: {
      connect: {
        id: session.user.id,
      },
    },
  };
  if (isInvalidText(clanek.nazev) || isInvalidText(clanek.obsah)) {
    return { message: 'Neplatná data formuláře' };
  }

  if (id) {
    await UpdateClanek(clanek, imageUrl, id);
  } else {
    await SaveClanek(clanek, imageUrl);
  }

  /*revalidatePath('/tazeni');
  redirect('/tazeni');*/

  return { message: 'Vytvořeno' };
}

export async function deleteAction(formData: FormData) {
  const id = formData.get('id') as string;
  const redirectTo = formData.get('redirectTo') as string;
  await DeleteClanek(id);
  /*revalidatePath('/tazeni');
  redirect('/tazeni');*/
  if (!redirectTo.startsWith('/')) {
    redirect('/');
  }
}
