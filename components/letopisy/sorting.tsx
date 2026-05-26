import { Letopisy } from '@prisma/client';

import { SeasonType, FantasyDate, FantasyDatePrecision } from './kalendar';

const precisionWeight = {
  year: 0,
  month: 1,
  day: 2,
  season: 3,
};

const seasonStart = {
  spring: { month: 3, day: 21 },
  summer: { month: 6, day: 21 },
  autumn: { month: 9, day: 21 },
  winter: { month: 12, day: 21 },
};

export function getFantasyDateSortValue(date: FantasyDate) {
  const seasonDate = date.season ? seasonStart[date.season] : null;

  const month = date.month ?? seasonDate?.month ?? 0;

  const day = date.day ?? seasonDate?.day ?? 0;

  return [date.year, precisionWeight[date.precision], month, day];
}

export const getSortedLetopisy = (letopisy: Letopisy[]) => {
  return [...letopisy].sort((a, b) => {
    const A = getFantasyDateSortValue({
      year: a.year,
      month: a.month ?? undefined,
      day: a.day ?? undefined,
      season: a.season as SeasonType | undefined,
      precision: a.datePrecision as FantasyDatePrecision,
    });

    const B = getFantasyDateSortValue({
      year: b.year,
      month: b.month ?? undefined,
      day: b.day ?? undefined,
      season: b.season as SeasonType | undefined,
      precision: b.datePrecision as FantasyDatePrecision,
    });

    for (let i = 0; i < A.length; i++) {
      if (A[i] !== B[i]) {
        return A[i] - B[i];
      }
    }

    return 0;
  });
};
