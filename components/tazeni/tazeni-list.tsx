import { Tazeni } from '@prisma/client';

import TazeniItem from './tazeni-item';

type Props = {
  tazeni: Tazeni[];
};

const TazeniList = ({ tazeni }: Props) => {
  return (
    <>
      <ul>
        {tazeni.map((tazeni) => (
          <li key={tazeni.id}>
            <TazeniItem tazeni={tazeni} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default TazeniList;
