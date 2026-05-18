import MapyItem from './mapy-item';
import { LokalitaTree } from '../kraje/kraje-helper';

type Props = {
  mapy: LokalitaTree[];
};

const MapyList = ({ mapy }: Props) => {
  return (
    <>
      <ul className="mb-6">
        {mapy.map((mapa) => (
          <li key={mapa.id}>
            <MapyItem mapa={mapa} />
            {mapa.children?.length > 0 && <MapyList mapy={mapa.children} />}
          </li>
        ))}
      </ul>
    </>
  );
};
export default MapyList;
