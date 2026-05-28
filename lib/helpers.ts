import { ClanekKategorie } from '@prisma/client';

export const isInvalidText = (text: string | null) => {
  return !text || text.trim() === '';
};

const KATEGORIE_URL = {
  SPOJENCI: { menu: 'svet', submenu: 'spojenci' },
  NEPRATELE: { menu: 'svet', submenu: 'nepratele' },
  NABOZENSTVI: { menu: 'svet', submenu: 'nabozenstvi' },
  SPOLKY: { menu: 'svet', submenu: 'rady-a-spolky' },
};
const KATEGORIE_SLOVO = {
  SPOJENCI: 'spojence',
  NEPRATELE: 'nepřítele',
  NABOZENSTVI: 'náboženství',
  SPOLKY: 'řády a spolky',
};
export const urlFromKategorie = (kategorie: ClanekKategorie) => {
  return KATEGORIE_URL[kategorie];
};

export const slovoFromKategorie = (kategorie: ClanekKategorie) => {
  return KATEGORIE_SLOVO[kategorie];
};
