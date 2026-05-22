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
      {lokalita.uroven === 'SVET' && (
        <h1 className="text-center">{lokalita.nazev}</h1>
      )}
      {lokalita.uroven === 'KRALOVSTVI' && <h2>{lokalita.nazev}</h2>}
      {lokalita.uroven === 'KRAJ' && <h3>{lokalita.nazev}</h3>}
      {lokalita.uroven === 'MISTO' && <h4>{lokalita.nazev}</h4>}

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
