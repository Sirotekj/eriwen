import Image from 'next/image';

import { Postava } from '@prisma/client';
import { Role } from '@prisma/client';

import { permissions } from '@/lib/permissions';

import EditPostavy from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

import SafeContent from '@/components/utils/clear-xss';

type Props = {
  postava: Postava;
  role: Role | undefined;
  userId: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
};
const PostavyItemEdit = ({
  postava,
  role,
  userId,
  handleEdit,
  handleDelete,
}: Props) => {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: postava.authorId,
  });
  return (
    <>
      <h3>{postava.jmeno}</h3>
      <p>
        {postava.rasa} ({postava.povolani})
      </p>
      <p>Hráč: {postava.hrac}</p>
      {postava.image && (
        <ImageWrapper>
          <Image
            className={`object-cover${postava.imageMultiply ? ' mix-blend-multiply' : ''}`}
            src={postava.image}
            alt={postava.id}
            sizes="242px"
            fill
          />
        </ImageWrapper>
      )}

      {postava.popis ? SafeContent(postava.popis) : ''}

      <p>Tažení: {postava.tazeni}</p>

      {canEdit && (
        <EditPostavy
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
};
export default PostavyItemEdit;
