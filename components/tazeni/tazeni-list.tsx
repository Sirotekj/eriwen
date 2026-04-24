'use client';

import { Tazeni } from '@prisma/client';

import TazeniItem from './tazeni-item';

type Props = {
  tazeni: Tazeni[];
};

const TazeniList = ({ tazeni }: Props) => {
  return (
    <>
      <ul>
        {tazeni.map((t) => (
          <li key={t.id}>
            <TazeniItem tazeni={t} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default TazeniList;
