import Image from 'next/image';

import { Mapa } from '@prisma/client';

import ImageWrapper from '@/components/utils/image-wrapper';
import SafeContent from '@/components/utils/clear-xss';

type Props = {
  mapa: Mapa;
};

const MapyItem = ({ mapa }: Props) => {
  return (
    <>
      {mapa.uroven === 'SVET' && (
        <h1 className="mb0 text-center">{mapa.nazev}</h1>
      )}
      {mapa.uroven === 'KRALOVSTVI' && <h2 className="mb0">{mapa.nazev}</h2>}
      {mapa.uroven === 'KRAJ' && <h3 className="mb0">{mapa.nazev}</h3>}
      {mapa.uroven === 'MISTO' && <h4 className="mb0">{mapa.nazev}</h4>}

      {mapa.image && (
        <ImageWrapper size="large">
          <picture>
            <img
              className={`object-cover h-auto${mapa.imageMultiply ? ' mix-blend-multiply' : ''}`}
              src={mapa.image}
              alt={mapa.id}
            />
          </picture>
        </ImageWrapper>
      )}

      {mapa.popis ? SafeContent(mapa.popis) : ''}
    </>
  );
};
export default MapyItem;
