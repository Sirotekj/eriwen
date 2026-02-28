'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createTazeni(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const canCreate = permissions.canCreate({
    role: session.user.role,
  });

  if (!canCreate) {
    throw new Error('Forbidden');
  }

  // data z formuláře
  const name = formData.get('name') as string;
  const pj = formData.get('pj') as string;
  const postavy = formData.get('postavy') as string;
  const obdobi = formData.get('obdobi') as string;
  const pribeh = formData.get('pribeh') as string;
  const order = Number(formData.get('order'));

  // základní validace
  if (!name || !pj || !postavy || !obdobi || !pribeh || Number.isNaN(order)) {
    throw new Error('Invalid input');
  }

  // automatické pořadí (pokud chceš)
  // const maxOrder = await prisma.tazeni.aggregate({
  //   _max: { order: true },
  // });
  // const nextOrder = (maxOrder._max.order ?? 0) + 1;

  await prisma.tazeni.create({
    data: {
      name,
      content: pribeh,
      order,
      author: {
        connect: {
          id: session.user.id,
        },
      },
      pj,
      postavy,
      obdobi,

      // další pole si můžeš uložit do content (JSON) nebo zvlášť
    },
  });

  revalidatePath('/tazeni');
  redirect('/tazeni');
}
