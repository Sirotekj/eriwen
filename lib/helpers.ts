import { ClanekKategorie } from '@prisma/client';

export const isInvalidText = (text: string | null) => {
  return !text || text.trim() === '';
};

export const urlFromKategorie = (kategorie: ClanekKategorie) => {
  if (kategorie === 'SPOJENCI') return '/svet/spojenci';
  if (kategorie === 'NEPRATELE') return '/svet/nepratele';
  if (kategorie === 'NABOZENSTVI') return '/svet/nabozenstvi';
};
