import { Postava } from '@prisma/client';

import PostavyItem from './postavy-item';

type Props = {
  postavy: Postava[];
};

const PostavyList = ({ postavy }: Props) => {
  return (
    <>
      <ul>
        {postavy.map((postava) => (
          <li
            key={postava.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            <PostavyItem postava={postava} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default PostavyList;
