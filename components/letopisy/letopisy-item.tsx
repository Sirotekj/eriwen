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
      <h4>
        {letopisy.year}
        {' - '}
        <span className="text-[90%]">
          {letopisy.season && getSeason(letopisy.season as SeasonType) + ' - '}
          {letopisy.day !== 0 && letopisy.day !== null && letopisy.day + '. '}
          {letopisy.month !== 0 &&
            letopisy.month !== null &&
            getMonth(letopisy.month) + ' - '}
        </span>
        {letopisy.nadpis}
      </h4>

      {letopisy.popis ? SafeContent(letopisy.popis) : ''}
    </>
  );
};
export default LetopisyItem;
