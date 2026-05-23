'use client';

import { useState } from 'react';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type FantasyDatePrecision = 'day' | 'month' | 'season' | 'year';

export interface FantasyDate {
  year: number;
  precision: FantasyDatePrecision;
  day?: number;
  month?: number;
  season?: Season;
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

export function getFantasyDateSortValue(date: FantasyDate) {
  const month = date.month ?? (date.season ? seasonMonthMap[date.season] : 0);

  const day = date.day ?? 0;

  return [date.year, month, day, precisionWeight[date.precision]];
}

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
                season: e.target.value as Season,
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
