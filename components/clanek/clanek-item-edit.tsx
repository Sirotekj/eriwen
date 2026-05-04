import Image from 'next/image';

import { ClanekKategorie, Role } from '@prisma/client';
import { ClanekView } from '@/types/types';

import { permissions } from '@/lib/permissions';

import ClanekCreateToggle from '@/components/clanek/clanek-create-toggle';
import EditClanek from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

import SafeContent from '@/components/utils/clear-xss';

type Props = {
  clanek: ClanekView;
  kategorie: ClanekKategorie;
  role: Role | undefined;
  userId: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
};

const ClanekItem = ({
  clanek,
  kategorie,
  role,
  userId,
  handleEdit,
  handleDelete,
}: Props) => {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: clanek.authorId,
  });
  return (
    <>
      <div>
        <h3 className="mb0">{clanek.nazev}</h3>

        {clanek.image && (
          <ImageWrapper>
            <Image
              className="object-cover"
              src={clanek.image}
              alt={clanek.id}
              sizes="242px"
              fill
            />
          </ImageWrapper>
        )}

        {clanek.obsah ? SafeContent(clanek.obsah) : ''}
        {canEdit && (
          <EditClanek
            handleEdit={() => handleEdit()}
            handleDelete={() => handleDelete()}
          />
        )}
      </div>
      <ClanekCreateToggle
        afterOrder={clanek.order.toString()}
        kategorie={kategorie}
      />
    </>
  );
};
export default ClanekItem;
