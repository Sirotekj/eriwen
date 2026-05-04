import { Clanek } from '@prisma/client';
import { ClanekView } from '@/types/types';

import ClanekItem from './clanek-item';

type Props = {
  clanek: ClanekView[];
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
