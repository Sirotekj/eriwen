import Image from 'next/image';

import { Lokalita } from '@prisma/client';

import ImageWrapper from '@/components/utils/image-wrapper';
import SafeContent from '@/components/utils/clear-xss';

type Props = {
  lokalita: Lokalita;
};

const KrajeItem = ({ lokalita }: Props) => {
  return (
    <>
      <h3 className="mb0">{lokalita.nazev}</h3>

      {lokalita.image && (
        <ImageWrapper>
          <Image
            className="object-cover"
            src={lokalita.image}
            alt={lokalita.id}
            sizes="242px"
            fill
          />
        </ImageWrapper>
      )}

      {lokalita.popis ? SafeContent(lokalita.popis) : ''}
    </>
  );
};
export default KrajeItem;
