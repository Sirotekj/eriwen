import Image from 'next/image';

import { ClanekView } from '@/types/types';

import ImageWrapper from '@/components/utils/image-wrapper';
import SafeContent from '@/components/utils/clear-xss';

type Props = {
  clanek: ClanekView;
};

const ClanekItem = ({ clanek }: Props) => {
  return (
    <>
      <h3 id={clanek.id}>{clanek.nazev}</h3>

      {clanek.image && (
        <ImageWrapper>
          <Image
            className={`object-cover${clanek.imageMultiply ? ' mix-blend-multiply' : ''}`}
            src={clanek.image}
            alt={clanek.id}
            sizes="242px"
            fill
          />
        </ImageWrapper>
      )}

      {clanek.obsah ? SafeContent(clanek.obsah) : ''}
    </>
  );
};
export default ClanekItem;
