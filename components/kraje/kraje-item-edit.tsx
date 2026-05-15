import Image from 'next/image';

import { Lokalita, Role } from '@prisma/client';

import { permissions } from '@/lib/permissions';

import KrajeCreateToggle from '@/components/kraje/kraje-create-toggle';
import EditKraje from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

import SafeContent from '@/components/utils/clear-xss';

type Props = {
  lokalita: Lokalita;
  role: Role | undefined;
  userId: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
};

const KrajeItemEdit = ({
  lokalita,
  role,
  userId,
  handleEdit,
  handleDelete,
}: Props) => {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: lokalita.authorId,
  });
  return (
    <>
      <div>
        <h3 className="mb0">{lokalita.nazev}</h3>
        {lokalita.popis ? SafeContent(lokalita.popis) : ''}
      </div>
    </>
  );
};
export default KrajeItemEdit;
