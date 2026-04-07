import { Tazeni, Role } from '@prisma/client';

type Props = {
  tazeni: Tazeni;
  role: Role | undefined;
  userId: string | undefined;
  isEditing: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
};

const TazeniItem = ({
  tazeni,
  role,
  userId,
  isEditing,
  handleEdit,
  handleDelete,
}: Props) => {
  return (
    <>
      <h3 className="mb0">{tazeni.jmeno}</h3>

      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4">
        <dt>Vypravěč:</dt>
        <dd>{tazeni.vypravec}</dd>

        <dt>Postavy:</dt>
        <dd>{tazeni.postavy}</dd>

        <dt>Časové období:</dt>
        <dd>{tazeni.obdobi}</dd>
      </dl>

      <p>{tazeni.pribeh}</p>
    </>
  );
};
export default TazeniItem;
