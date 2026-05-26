'use client';

import { useState } from 'react';

import { Letopisy } from '@prisma/client';
import { SuffixPathnameNormalizer } from 'next/dist/server/normalizers/request/suffix';

export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';

export type FantasyDatePrecision = 'day' | 'month' | 'season' | 'year';

export interface FantasyDate {
  year: number;
  precision: FantasyDatePrecision;
  day?: number;
  month?: number;
  season?: SeasonType;
}

const MONTHS = [
  'leden',
  'únor',
  'březen',
  'duben',
  'květen',
  'červen',
  'červenec',
  'srpen',
  'září',
  'říjen',
  'listopad',
  'prosinec',
];

const SEASONS: Record<SeasonType, string> = {
  spring: 'jaro',
  summer: 'léto',
  autumn: 'podzim',
  winter: 'zima',
};

//const Season

export const getMonth = (month: number) => {
  const mesic = MONTHS[month];
  return mesic;
};

export const getSeason = (season: SeasonType) => {
  const rocniObdobi = SEASONS[season];
  return rocniObdobi;
};

const precisionWeight = {
  year: 0,
  season: 1,
  month: 2,
  day: 3,
};

const seasonMonthMap = {
  spring: 3,
  summer: 6,
  autumn: 9,
  winter: 12,
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

  return [date.year, month, day, precisionWeight[date.precision]];
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

export function FantasyDateField() {
  const [value, setValue] = useState<FantasyDate>({
    precision: 'day',
    year: 0,
    day: 1,
    month: 1,
  });

  return (
    <>
      <label htmlFor="datePrecision">Typ datumu</label>
      <select
        id="datePrecision"
        title="datePrecision"
        name="datePrecision"
        value={value.precision}
        className="form-select"
        onChange={(e) =>
          setValue({
            ...value,
            precision: e.target.value as FantasyDatePrecision,
          })
        }
      >
        <option value="day">Přesné datum</option>
        <option value="month">Měsíc</option>
        <option value="season">Roční období</option>
        <option value="year">Jen rok</option>
      </select>

      {value.precision === 'day' && (
        <div className="flex gap-2">
          <label htmlFor="day">Den</label>
          <input
            title="day"
            name="day"
            type="number"
            min={1}
            max={31}
            value={value.day ?? 1}
            className="form-input"
            onChange={(e) =>
              setValue({
                ...value,
                day: Number(e.target.value),
              })
            }
          />

          <label htmlFor="month">Měsíc</label>
          <select
            title="month"
            name="month"
            value={value.month ?? 1}
            className="form-select"
            onChange={(e) =>
              setValue({
                ...value,
                month: Number(e.target.value),
              })
            }
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
      )}
      {value.precision === 'season' && (
        <>
          <label htmlFor="season">Roční období</label>
          <select
            title="season"
            name="season"
            value={value.season}
            className="form-input"
            onChange={(e) =>
              setValue({
                ...value,
                season: e.target.value as SeasonType,
              })
            }
          >
            <option value="spring">Jaro</option>
            <option value="summer">Léto</option>
            <option value="autumn">Podzim</option>
            <option value="winter">Zima</option>
          </select>
        </>
      )}
      <label htmlFor="year">Rok</label>
      <input
        title="year"
        name="year"
        type="number"
        min={-100}
        max={800}
        value={value.year}
        className="form-input"
        onChange={(e) =>
          setValue({
            ...value,
            year: Number(e.target.value),
          })
        }
      />

      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
}
