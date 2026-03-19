import Image from 'next/image';
import { Postava } from '@prisma/client';
import ImageWrapper from '@/components/utils/image-wrapper';
import EditArticle from '@/components/utils/edit-article';

type Props = {
  postavy: Postava[];
  userId: string | undefined;
};

const PostavyList = ({ postavy, userId }: Props) => {
  return (
    <ul>
      {postavy.map((p) => (
        <li
          key={p.id}
          className="relative my-4 after-content-[''] after:block after:clear-both"
        >
          <strong>{p.name}</strong> – {p.race} ({p.profession})
          {p.image && (
            <ImageWrapper>
              <Image
                className="object-cover w-1/3"
                src={p.image}
                alt={p.id}
                fill
              />
            </ImageWrapper>
          )}
          <p>{p.content}</p>
          <span>{p.authorId}</span>
          {p.authorId === userId && <EditArticle id={p.id} />}
        </li>
      ))}
    </ul>
  );
};
export default PostavyList;
