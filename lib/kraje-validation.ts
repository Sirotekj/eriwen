import { LokalitaUroven } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function validateHierarchy(
  uroven: LokalitaUroven,
  parentId: string | null,
) {
  // SVET
  if (uroven === 'SVET') {
    if (parentId !== null) {
      throw new Error('SVET nesmí mít parent.');
    }

    return;
  }

  // ostatní musí parent mít
  if (!parentId) {
    throw new Error('Tato úroveň musí mít parent.');
  }

  const parent = await prisma.lokalita.findUnique({
    where: { id: parentId },
    select: {
      uroven: true,
    },
  });

  if (!parent) {
    throw new Error('Parent nebyl nalezen.');
  }

  // KRALOVSTVI
  if (uroven === 'KRALOVSTVI' && parent.uroven !== 'SVET') {
    throw new Error('KRALOVSTVI musí být uvnitř SVETA.');
  }

  // KRAJ
  if (uroven === 'KRAJ' && parent.uroven !== 'KRALOVSTVI') {
    throw new Error('KRAJ musí být uvnitř KRALOVSTVI.');
  }

  // MISTO
  if (uroven === 'MISTO' && parent.uroven !== 'KRAJ') {
    throw new Error('MISTO musí být uvnitř KRAJE.');
  }
}
