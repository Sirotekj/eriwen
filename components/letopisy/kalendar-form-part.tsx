'use client';

import { useState } from 'react';

import { Letopisy } from '@prisma/client';
import {
  MONTHS,
  SeasonType,
  FantasyDate,
  FantasyDatePrecision,
} from './kalendar';

type Props = { initialData?: Letopisy };

export function FantasyDateField({ initialData }: Props) {
  const [value, setValue] = useState<FantasyDate>({
    precision: (initialData?.datePrecision as FantasyDatePrecision) ?? 'season',
    year: initialData?.year ?? 0,
    day: initialData?.day ?? undefined,
    month: initialData?.month ?? undefined,
    season: (initialData?.season as SeasonType) ?? undefined,
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
        onChange={(e) => {
          const precision = e.target.value as FantasyDatePrecision;

          setValue({
            precision,

            year: value.year,

            month:
              precision === 'day' || precision === 'month'
                ? value.month
                : undefined,

            day: precision === 'day' ? value.day : undefined,

            season: precision === 'season' ? value.season : undefined,
          });
        }}
      >
        <option value="day">Přesné datum</option>
        <option value="month">Měsíc</option>
        <option value="season">Roční období</option>
        <option value="year">Jen rok</option>
      </select>

      {value.precision === 'day' && (
        <>
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
        </>
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
    </>
  );
}
