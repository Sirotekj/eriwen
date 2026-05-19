import Image from 'next/image';

import { Lokalita, Role } from '@prisma/client';

import { permissions } from '@/lib/permissions';

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
        {lokalita.uroven === 'SVET' && (
          <h1 className="mb0 text-center">{lokalita.nazev}</h1>
        )}
        {lokalita.uroven === 'KRALOVSTVI' && (
          <h2 className="mb0">{lokalita.nazev}</h2>
        )}
        {lokalita.uroven === 'KRAJ' && (
          <h3 className="mb0">{lokalita.nazev}</h3>
        )}
        {lokalita.uroven === 'MISTO' && (
          <h4 className="mb0">{lokalita.nazev}</h4>
        )}
        {lokalita.image && (
          <ImageWrapper>
            <Image
              className="object-cover"
              src={lokalita.image}
              alt={lokalita.id}
              sizes="242px"
              fill
            />
          </ImageWrapper>
        )}
        {lokalita.popis ? SafeContent(lokalita.popis) : ''}
      </div>
      {canEdit && (
        <EditKraje
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
};
export default KrajeItemEdit;
