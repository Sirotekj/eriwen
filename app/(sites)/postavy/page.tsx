export const dynamic = 'force-dynamic';

import { getPostavy } from '@/lib/postavy-prisma';
import PostavyList from '@/components/postavy/postavy-list';

export default async function PostavyPage() {
  const postavy = await getPostavy();

  return (
    <div>
      <h1 className="headline">Postavy</h1>
      <blockquote>
        „Hrdinství je způsob smrti, nikoliv způsob života.“
        <span>Gabriel Laub</span>
      </blockquote>

      <p>
        Zde můžete najít stručný popis postav a jakých tažení se zúčastnili.
      </p>
      {postavy.length > 0 ? (
        <PostavyList postavy={postavy} />
      ) : (
        <p>
          <i>Ještě zde nejsou žádné postavy!</i>
        </p>
      )}
    </div>
  );
}
