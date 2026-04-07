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
  isEditing: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
};
export default function PostavyItem({
  postava,
  role,
  userId,
  isEditing,
  handleEdit,
  handleDelete,
}: Props) {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: postava.authorId,
  });
  return (
    <>
      <h3 className="mb0">{postava.jmeno}</h3>
      <p className="mt0">
        {postava.rasa} ({postava.povolani})
      </p>
      <p>Hráč: {postava.hrac}</p>
      {postava.image && (
        <ImageWrapper>
          <Image
            className="object-cover w-1/3"
            src={postava.image}
            alt={postava.id}
            fill
          />
        </ImageWrapper>
      )}
      <p>{postava.popis ? SafeContent(postava.popis) : ''}</p>
      <span>{postava.authorId}</span>
      {isEditing && canEdit && (
        <EditPostavy
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
}
