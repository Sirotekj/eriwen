'use client';

import { Letopisy } from '@prisma/client';

import LetopisyItem from './letopisy-item';
import { getSortedLetopisy } from './sorting';

type Props = {
  letopisy: Letopisy[];
};

const LetopisyList = ({ letopisy }: Props) => {
  const sortedLetopisy = getSortedLetopisy(letopisy);
  return (
    <>
      <ul>
        {sortedLetopisy.map((l) => (
          <li key={l.id}>
            <LetopisyItem letopisy={l} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default LetopisyList;
