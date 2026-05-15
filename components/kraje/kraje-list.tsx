import { Lokalita } from '@prisma/client';

import KrajeItem from './kraje-item';
import { buildTree } from './kraje-helper';

type Props = {
  lokality: Lokalita[];
};

const KrajeList = ({ lokality }: Props) => {
  const tree = buildTree(lokality);
  return (
    <>
      <ul>
        {tree.map((a) => (
          <li key={a.id}>
            <KrajeItem lokalita={a} />
            {a.children?.length > 0 && <KrajeList lokality={a.children} />}
          </li>
        ))}
      </ul>
    </>
  );
};
export default KrajeList;
