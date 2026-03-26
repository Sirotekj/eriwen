import { Tazeni } from '@prisma/client';

type Props = {
  tazeni: Tazeni;
};

const TazeniItem = ({ tazeni }: Props) => {
  return (
    <>
      <h3 className="mb0">{tazeni.name}</h3>
      <p>Vypravěč: {tazeni.pj}</p>
      <p>Postavy: {tazeni.postavy}</p>
      <p>Období: {tazeni.obdobi}</p>
    </>
  );
};
export default TazeniItem;
