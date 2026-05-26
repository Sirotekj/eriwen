import Image from 'next/image';

import { Letopisy } from '@prisma/client';

import SafeContent from '@/components/utils/clear-xss';

import { SeasonType } from './kalendar';
import { getMonth } from './kalendar';
import { getSeason } from './kalendar';

type Props = {
  letopisy: Letopisy;
};

const LetopisyItem = ({ letopisy }: Props) => {
  return (
    <>
      <h3>
        {letopisy.year}{' '}
        {letopisy.season && getSeason(letopisy.season as SeasonType)}
        {letopisy.month !== 0 &&
          letopisy.month !== null &&
          getMonth(letopisy.month) + ' '}
        {letopisy.day !== 0 && letopisy.day !== null && letopisy.day}
        {' - '}
        {letopisy.nadpis}
      </h3>

      {letopisy.popis ? SafeContent(letopisy.popis) : ''}
    </>
  );
};
export default LetopisyItem;
