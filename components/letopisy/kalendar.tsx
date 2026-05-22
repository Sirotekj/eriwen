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

export function FantasyDateField() {
  const [value, setValue] = useState<FantasyDate>({
    precision: 'day',
    year: 0,
    day: 1,
    month: 1,
  });

  return (
    <div className="space-y-4">
      <label htmlFor="precision">Typ datumu</label>
      <select
        id="precision"
        title="precision"
        value={value.precision}
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
            type="number"
            min={1}
            max={30}
            value={value.day ?? 1}
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
            value={value.month ?? 1}
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
            value={value.season}
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
        type="number"
        min={-100}
        max={800}
        value={value.year}
        onChange={(e) =>
          setValue({
            ...value,
            year: Number(e.target.value),
          })
        }
      />

      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
