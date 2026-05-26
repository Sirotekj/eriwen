export interface FantasyDate {
  year: number;
  precision: 'year' | 'season' | 'month' | 'day';
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  month?: number;
  day?: number;
}

const precisionWeight = {
  year: 0,
  season: 1,
  month: 2,
  day: 3,
};

const seasonOrder = {
  spring: 0,
  summer: 1,
  autumn: 2,
  winter: 3,
};

const seasonStart = {
  spring: { month: 3, day: 21 },
  summer: { month: 6, day: 21 },
  autumn: { month: 9, day: 21 },
  winter: { month: 12, day: 21 },
};
