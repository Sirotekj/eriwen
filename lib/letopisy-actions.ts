'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import xss from 'xss';

import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import {
  SaveLetopisy,
  UpdateLetopisy,
  DeleteLetopisy,
} from '@/lib/letopisy-prisma';

import { FormState } from '@/types/types';
import { isInvalidText } from '@/lib/helpers';

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

  const monthValue = formData.get('month');
  const dayValue = formData.get('day');
  const seasonValue = formData.get('season');

  const letopisy = {
    nadpis: formData.get('nadpis') as string,
    popis: xss(formData.get('popis') as string),

    datePrecision: formData.get('datePrecision') as string,

    year: Number(formData.get('year')),
    month: monthValue != null && monthValue !== '' ? Number(monthValue) : null,
    day: dayValue != null && dayValue !== '' ? Number(dayValue) : null,

    season:
      typeof seasonValue === 'string' && seasonValue !== ''
        ? seasonValue
        : null,

    author: {
      connect: {
        id: session.user.id,
      },
    },
  };
  if (isInvalidText(letopisy.nadpis)) {
    messages.push('Chybí nadpis!');
  }
  if (messages.length > 0) {
    return { messages, errors };
  }

  if (id) {
    await UpdateLetopisy(letopisy, id);
  } else {
    await SaveLetopisy(letopisy);
  }

  redirect('/svet/letopisy');
}

export async function deleteAction(formData: FormData) {
  const id = formData.get('id') as string;
  await DeleteLetopisy(id);

  redirect('/svet/letopisy');
}
