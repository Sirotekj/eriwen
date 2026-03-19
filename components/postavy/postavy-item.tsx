import { Postava } from '@prisma/client';
import Image from 'next/image';

import EditPostavy from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

type Props = {
  postava: Postava;
  userId: string | undefined;
  isEditing: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
};
export default function PostavyItem({
  postava,
  userId,
  isEditing,
  handleEdit,
  handleDelete,
}: Props) {
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
      {isEditing && postava.authorId === userId && (
        <EditPostavy
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
}
