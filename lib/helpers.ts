import { ClanekKategorie } from '@prisma/client';

export const isInvalidText = (text: string | null) => {
  return !text || text.trim() === '';
};

const KATEGORIE_MAP = {
  SPOJENCI: { menu: 'svet', submenu: 'spojenci' },
  NEPRATELE: { menu: 'svet', submenu: 'nepratele' },
  NABOZENSTVI: { menu: 'svet', submenu: 'nabozenstvi' },
};
export const urlFromKategorie = (kategorie: ClanekKategorie) => {
  return KATEGORIE_MAP[kategorie];
};
