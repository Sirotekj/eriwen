import Image from 'next/image';

import { Postava } from '@prisma/client';
import { Role } from '@prisma/client';

import { permissions } from '@/lib/permissions';

import EditPostavy from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

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
      <strong>{postava.name}</strong> – {postava.race} ({postava.profession})
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
      <p>{postava.content}</p>
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
