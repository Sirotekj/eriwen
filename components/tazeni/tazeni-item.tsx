import Image from 'next/image';

import { Tazeni } from '@prisma/client';

import ImageWrapper from '@/components/utils/image-wrapper';
import SafeContent from '@/components/utils/clear-xss';

type Props = {
  tazeni: Tazeni;
};

const TazeniItem = ({ tazeni }: Props) => {
  return (
    <>
      <h3 className="mb0">{tazeni.jmeno}</h3>

      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4">
        <dt>Vypravěč:</dt>
        <dd>{tazeni.vypravec}</dd>

        <dt>Postavy:</dt>
        <dd>{tazeni.postavy}</dd>

        <dt>Časové období:</dt>
        <dd>{tazeni.obdobi}</dd>
      </dl>

      {tazeni.image && (
        <ImageWrapper>
          <Image
            className="object-cover"
            src={tazeni.image}
            alt={tazeni.id}
            sizes="242px"
            fill
          />
        </ImageWrapper>
      )}

      {tazeni.pribeh ? SafeContent(tazeni.pribeh) : ''}
    </>
  );
};
export default TazeniItem;
