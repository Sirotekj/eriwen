import Image from 'next/image';

import { Mapa, Role } from '@prisma/client';

import { permissions } from '@/lib/permissions';

import EditMapy from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

import SafeContent from '@/components/utils/clear-xss';

type Props = {
  mapa: Mapa;
  role: Role | undefined;
  userId: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
};

const MapyItemEdit = ({
  mapa,
  role,
  userId,
  handleEdit,
  handleDelete,
}: Props) => {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: mapa.authorId,
  });
  return (
    <>
      <div className="mb-2">
        {mapa.uroven === 'SVET' && (
          <h1 className="mb0 text-center">{mapa.nazev}</h1>
        )}
        {mapa.uroven === 'KRALOVSTVI' && <h2 className="mb0">{mapa.nazev}</h2>}
        {mapa.uroven === 'KRAJ' && <h3 className="mb0">{mapa.nazev}</h3>}
        {mapa.uroven === 'MISTO' && <h4 className="mb0">{mapa.nazev}</h4>}
        {mapa.image && (
          <ImageWrapper size="large">
            <img
              className="object-cover h-auto mix-blend-multiply"
              src={mapa.image}
              alt={mapa.id}
            />
          </ImageWrapper>
        )}
        {mapa.popis ? SafeContent(mapa.popis) : ''}
      </div>
      {canEdit && (
        <EditMapy
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
};
export default MapyItemEdit;
