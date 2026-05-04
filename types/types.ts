import { Prisma, ClanekKategorie } from '@prisma/client';
export type FormState = {
  message: string | null;
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
