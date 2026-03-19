import { Postava } from '@prisma/client';
import Image from 'next/image';
import ImageWrapper from '@/components/utils/image-wrapper';

type Props = {
  postava: Postava;
};
export default function PostavyItem({ postava }: Props) {
  return (
    <li
      key={postava.id}
      className="my-4 after-content-[''] after:block after:clear-both"
    >
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
      {/*postava.authorId === userId && <EditPostavy id={postava.id} />*/}
    </li>
  );
}
