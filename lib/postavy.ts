import { prisma } from './db';
import fs from 'node:fs';

import type { PostavaType } from '@/types/types';

export async function getPostavy() {
  return prisma.postava.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function SavePostavy(postava: PostavaType) {
  const extension = postava.name.split('.').pop() as string;
  const fileName = `postava_${postava.order}.${extension}`;

  const stream = fs.createWriteStream(`public/images/postavy/${fileName}`);
  const bufferedImage = await postava.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw Error('Chyba při ukládání obrázku: ' + error.message);
    }
  });
  //postava.image = `/images/postavy/${fileName}`;
  await prisma.tazeni.create({
    data: {
      ...postava,
      image: `/images/postavy/${fileName}`,
    },
  });
}
