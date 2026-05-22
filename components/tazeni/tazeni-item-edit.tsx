import Image from 'next/image';

import { Tazeni, Role } from '@prisma/client';

import { permissions } from '@/lib/permissions';

import TazeniCreateToggle from '@/components/tazeni/tazeni-create-toggle';
import EditTazeni from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

import SafeContent from '@/components/utils/clear-xss';

type Props = {
  tazeni: Tazeni;
  index: number;
  role: Role | undefined;
  userId: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
};

const TazeniItemEdit = ({
  tazeni,
  index,
  role,
  userId,
  handleEdit,
  handleDelete,
}: Props) => {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: tazeni.authorId,
  });
  return (
    <>
      <div>
        <h3>
          {index}. {tazeni.jmeno}
        </h3>

        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4">
          <dt>Vypravěč:</dt>
          <dd>{tazeni.vypravec}</dd>

          <dt>Postavy:</dt>
          <dd>{tazeni.postavy}</dd>

          <dt>Časové období:</dt>
          <dd>{tazeni.obdobi}</dd>
        </dl>

        {tazeni.image && (
          <ImageWrapper>
            <Image
              className="object-cover"
              src={tazeni.image}
              alt={tazeni.id}
              sizes="242px"
              fill
            />
          </ImageWrapper>
        )}

        {tazeni.pribeh ? SafeContent(tazeni.pribeh) : ''}
        {canEdit && (
          <EditTazeni
            handleEdit={() => handleEdit()}
            handleDelete={() => handleDelete()}
          />
        )}
      </div>
      <TazeniCreateToggle afterOrder={tazeni.order} />
    </>
  );
};
export default TazeniItemEdit;
