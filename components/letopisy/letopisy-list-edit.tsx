import { Letopisy, Role } from '@prisma/client';

import LetopisyItem from './letopisy-item';

type Props = {
  letopisy: Letopisy[];
  role: Role | undefined;
  userId: string | undefined;
};

const LetopisyList = ({ letopisy, role, userId }: Props) => {
  return (
    <>
      <ul>
        {letopisy.map((l) => (
          <li key={l.id}>
            <LetopisyItem letopisy={l} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default LetopisyList;
