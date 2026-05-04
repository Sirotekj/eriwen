import { Clanek } from '@prisma/client';

import ClanekItem from './clanek-item';

type Props = {
  clanek: Clanek[];
};

const ClanekList = ({ clanek }: Props) => {
  return (
    <>
      <ul>
        {clanek.map((c) => (
          <li key={c.id}>
            <ClanekItem clanek={c} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ClanekList;
