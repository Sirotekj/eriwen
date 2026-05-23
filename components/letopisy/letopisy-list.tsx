import { Letopisy } from '@prisma/client';

import LetopisyItem from './letopisy-item';

type Props = {
  letopisy: Letopisy[];
};

const LetopisyList = ({ letopisy }: Props) => {
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
