import { Prisma, ClanekKategorie } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function calculateOrder({
  category,
  afterOrder,
  position,
}: {
  category: ClanekKategorie;
  afterOrder?: Prisma.Decimal;
  position?: 'start' | 'end';
}): Promise<Prisma.Decimal> {
  if (afterOrder) {
    const next = await prisma.clanek.findFirst({
      where: {
        kategorie: category,
        order: { gt: afterOrder },
      },
      orderBy: { order: 'asc' },
    });

    if (next) {
      return afterOrder.plus(next.order).div(2);
    }

    return afterOrder.plus(1);
  }

  if (position === 'start') {
    const first = await prisma.clanek.findFirst({
      where: { kategorie: category },
      orderBy: { order: 'asc' },
    });

    return first ? first.order.minus(1) : new Prisma.Decimal(1);
  }

  const last = await prisma.clanek.findFirst({
    where: { kategorie: category },
    orderBy: { order: 'desc' },
  });

  return last ? last.order.plus(1) : new Prisma.Decimal(1);
}
