import { Tazeni } from '@prisma/client';

import TazeniItem from './tazeni-item';

type Props = {
  tazeni: Tazeni[];
};

const TazeniList = ({ tazeni }: Props) => {
  return (
    <>
      <ul>
        {tazeni.map((t, index) => (
          <li key={t.id}>
            <TazeniItem tazeni={t} index={index + 1} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default TazeniList;
