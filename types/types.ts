export type FormState = {
  message: string | null;
};

export type PageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

export type PostavaType = {
  jmeno: string;
  rasa: string;
  povolani: string;
  popis: string;
  tazeni: string;
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
  svypravec: string;
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
