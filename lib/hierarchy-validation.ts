import { LokalitaUroven } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type ValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      message: string;
    };

export async function validateHierarchy(
  type: 'lokalita' | 'mapa',
  uroven: LokalitaUroven,
  parentId: string | null,
): Promise<ValidationResult> {
  if (uroven === 'SVET') {
    if (parentId !== null) {
      return {
        valid: false,
        message: 'SVET nesmí mít parent.',
      };
    }

    return { valid: true };
  }

  if (!parentId) {
    return {
      valid: false,
      message: 'Tato úroveň musí mít parent.',
    };
  }
  let parent;
  if (type === 'lokalita') {
    parent = await prisma.lokalita.findUnique({
      where: { id: parentId },
      select: {
        uroven: true,
      },
    });
  } else {
    parent = await prisma.mapa.findUnique({
      where: { id: parentId },
      select: {
        uroven: true,
      },
    });
  }

  if (!parent) {
    return {
      valid: false,
      message: 'Parent nebyl nalezen.',
    };
  }

  const allowedParents = {
    KRALOVSTVI: 'SVET',
    KRAJ: 'KRALOVSTVI',
    MISTO: 'KRAJ',
  };

  const expected = allowedParents[uroven as keyof typeof allowedParents];

  if (expected && parent.uroven !== expected) {
    return {
      valid: false,
      message: `${uroven} musí být uvnitř ${expected}.`,
    };
  }

  return { valid: true };
}
