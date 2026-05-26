import { Letopisy, Role } from '@prisma/client';
import EditLetopisy from '@/components/utils/edit-article';

import { permissions } from '@/lib/permissions';

import SafeContent from '@/components/utils/clear-xss';

import { SeasonType } from './kalendar';
import { getMonth } from './kalendar';
import { getSeason } from './kalendar';

type Props = {
  letopisy: Letopisy;
  role: Role | undefined;
  userId: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
};

const LetopisyItemEdit = ({
  letopisy,
  role,
  userId,
  handleEdit,
  handleDelete,
}: Props) => {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: letopisy.authorId,
  });
  return (
    <>
      <h4>
        {letopisy.year}
        {' - '}
        <span className="text-[90%]">
          {letopisy.season && getSeason(letopisy.season as SeasonType) + ' - '}
          {letopisy.day !== 0 && letopisy.day !== null && letopisy.day + '. '}
          {letopisy.month !== 0 &&
            letopisy.month !== null &&
            getMonth(letopisy.month) + ' - '}
        </span>
        {letopisy.nadpis}
      </h4>

      {letopisy.popis ? SafeContent(letopisy.popis) : ''}
      {canEdit && (
        <EditLetopisy
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
};
export default LetopisyItemEdit;
