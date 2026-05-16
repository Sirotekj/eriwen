import KrajeItem from './kraje-item';
import { LokalitaTree } from './kraje-helper';

type Props = {
  lokality: LokalitaTree[];
};

const KrajeList = ({ lokality }: Props) => {
  return (
    <>
      <ul>
        {lokality.map((lokalita) => (
          <li key={lokalita.id}>
            <KrajeItem lokalita={lokalita} />
            {lokalita.children?.length > 0 && (
              <KrajeList lokality={lokalita.children} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
export default KrajeList;
