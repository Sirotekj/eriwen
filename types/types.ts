import { Prisma, ClanekKategorie, LokalitaUroven } from '@prisma/client';
export type FormState = {
  messages: string[];
  errors: string[];
};

export type PageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

export type ArticleType = 'postava' | 'tazeni';

export type PostavaType = {
  jmeno: string;
  rasa: string;
  povolani: string;
  popis: string;
  tazeni: string;
  hrac: string;
  order: number;
  imageMultiply: boolean;
  //image: string;
  author: {
    connect: {
      id: string;
    };
  };
};

export type TazeniType = {
  jmeno: string;
  vypravec: string;
  obdobi: string;
  postavy: string;
  pribeh: string;
  order: number;
  imageMultiply: boolean;
  //image: string;
  author: {
    connect: {
      id: string;
    };
  };
};

export type ClanekCreateInput = {
  nazev: string;
  obsah: string;
  kategorie: ClanekKategorie;
  order: Prisma.Decimal;
  imageMultiply: boolean;
  author: {
    connect: {
      id: string;
    };
  };
};

/*export type ClanekType = {
  id: string;
  nazev: string;
  obsah: string;
  kategorie: ClanekKategorie;
  image: string | null;
  order: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};*/

export type ClanekView = {
  id: string;
  nazev: string;
  obsah: string | null;
  image: string | null;
  imageMultiply: boolean;
  kategorie: ClanekKategorie;
  order: string;
  authorId: string;
};

export type LokalitaInput = {
  nazev: string;
  popis: string;
  uroven: LokalitaUroven;
  parentId?: string | null;
  authorId: string;
  imageMultiply: boolean;
};

export type LokalitaView = {
  id: string;
  nazev: string;
  uroven: LokalitaUroven;
  popis: string | null;
  image: string | null;
  imageMultiply: boolean;
  authorId: string;
};

export type MapaInput = {
  nazev: string;
  popis: string;
  uroven: LokalitaUroven;
  parentId?: string | null;
  authorId: string;
  imageMultiply: boolean;
};

export type MapaView = {
  id: string;
  nazev: string;
  uroven: LokalitaUroven;
  popis: string | null;
  image: string | null;
  imageMultiply: boolean;
  authorId: string;
};

export type LetopisyType = {
  nadpis: string;
  popis: string;

  datePrecision: string;

  year: number;
  month: number | null;
  day: number | null;

  season: string | null;

  author: {
    connect: {
      id: string;
    };
  };
};

export type Enemy = {
  id: string;
  name: string;
  health: number | null;
  mana: number | null;
  favor: number | null;
  adrenaline: number | null;
  level: number | null;
  divinePower: number | null;
  challengeRating: string | null;
  strength: number | null;
  dexterity: number | null;
  constitution: number | null;
  intelligence: number | null;
  charisma: number | null;
  movement: number | null;
  size: string | null;
  attackValue: number | null;
  damageValue: number | null;
  baseDefense: number | null;
  defenseValue: number | null;
  specialAbilities: string | null;
  resistances: string | null;
  immunities: string | null;
  weaknesses: string | null;
  skills: string | null;
  habitat: string | null;
  type: string | null;
  experiencePoints: number | null;
  notes: string | null;
  description: string | null;
  image: string | null;
  imageMultiply: boolean;
  isPublic: boolean;
  authorId: string;
};

/** @deprecated Použij `Enemy` */
export type NepritelType = Enemy & {
  author: {
    connect: {
      id: string;
    };
  };
};
