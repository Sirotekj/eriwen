import Image from 'next/image';

import { Postava } from '@prisma/client';

import ImageWrapper from '@/components/utils/image-wrapper';
import SafeContent from '@/components/utils/clear-xss';

type Props = {
  postava: Postava;
};
export default function PostavyItem({ postava }: Props) {
  return (
    <>
      <h3>{postava.jmeno}</h3>
      <p>
        {postava.rasa} ({postava.povolani})
      </p>
      {postava.image && (
        <ImageWrapper>
          <Image
            className="object-cover"
            src={postava.image}
            alt={postava.id}
            sizes="242px"
            fill
          />
        </ImageWrapper>
      )}

      {postava.popis ? SafeContent(postava.popis) : ''}

      <p>Tažení: {postava.tazeni}</p>
      <p>Hráč: {postava.hrac}</p>
    </>
  );
}
