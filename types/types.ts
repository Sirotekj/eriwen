export type FormState = {
  message: string | null;
};

export type PageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

export type PostavaType = {
  name: string;
  race: string;
  profession: string;
  content: string;
  campaign: string;
  order: number;
  //image: string;
  author: {
    connect: {
      id: string;
    };
  };
};
