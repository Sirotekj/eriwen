import { ClanekView } from '@/types/types';

import ClanekItem from './clanek-item';

type Props = {
  clanek: ClanekView[];
};

const ClanekList = ({ clanek }: Props) => {
  return (
    <>
      <ul>
        {clanek.map((c, index) => (
          <li key={c.id}>
            <a className="border-b" href={`#${c.id}`}>
              {index + 1}. {c.nazev}
            </a>
          </li>
        ))}
      </ul>

      <ul>
        {clanek.map((c) => (
          <li
            key={c.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            <ClanekItem clanek={c} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ClanekList;
