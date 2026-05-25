import Image from 'next/image';

import { Letopisy, Role } from '@prisma/client';
import LetopisyCreateToggle from '@/components/letopisy/letopisy-create-toggle';
import EditLetopisy from '@/components/utils/edit-article';

import { permissions } from '@/lib/permissions';

import SafeContent from '@/components/utils/clear-xss';

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
      <h3>
        {letopisy.year}
        {letopisy.season}
        {letopisy.month}
        {letopisy.day} {letopisy.nadpis}
      </h3>

      {letopisy.popis ? SafeContent(letopisy.popis) : ''}
      {canEdit && (
        <EditLetopisy
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
      <LetopisyCreateToggle />
    </>
  );
};
export default LetopisyItemEdit;
