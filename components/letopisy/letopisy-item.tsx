import Image from 'next/image';

import { Letopisy } from '@prisma/client';

import SafeContent from '@/components/utils/clear-xss';

type Props = {
  letopisy: Letopisy;
};

const LetopisyItem = ({ letopisy }: Props) => {
  return (
    <>
      <h3>
        {letopisy.year}
        {letopisy.season}
        {letopisy.month}
        {letopisy.day} {letopisy.nadpis}
      </h3>

      {letopisy.popis ? SafeContent(letopisy.popis) : ''}
    </>
  );
};
export default LetopisyItem;
