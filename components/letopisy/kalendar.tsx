export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';

export type FantasyDatePrecision = 'day' | 'month' | 'season' | 'year';

export const MONTHS = [
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

export const SEASONS: Record<SeasonType, string> = {
  spring: 'jaro',
  summer: 'léto',
  autumn: 'podzim',
  winter: 'zima',
};
export interface FantasyDate {
  year: number;
  precision: 'year' | 'season' | 'month' | 'day';
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  month?: number;
  day?: number;
}

export const getMonth = (month: number) => {
  const mesic = MONTHS[month - 1];
  return mesic;
};

export const getSeason = (season: SeasonType) => {
  const rocniObdobi = SEASONS[season];
  return rocniObdobi;
};
