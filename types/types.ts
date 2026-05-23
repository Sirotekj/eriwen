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
};

export type LokalitaView = {
  id: string;
  nazev: string;
  uroven: LokalitaUroven;
  popis: string | null;
  image: string | null;
  authorId: string;
};

export type MapaInput = {
  nazev: string;
  popis: string;
  uroven: LokalitaUroven;
  parentId?: string | null;
  authorId: string;
};

export type MapaView = {
  id: string;
  nazev: string;
  uroven: LokalitaUroven;
  popis: string | null;
  image: string | null;
  authorId: string;
};

export type LetopisyType = {
  nadpis: string;
  popis: string;

  datePrecision: string;

  year: number;
  month: number;
  day: number;

  season: string;

  author: {
    connect: {
      id: string;
    };
  };
};
