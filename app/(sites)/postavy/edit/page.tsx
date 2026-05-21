import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { getPostavy } from '@/lib/postavy-prisma';
import PostavyListEdit from '@/components/postavy/postavy-list-edit';
import PostavyCreateToggle from '@/components/postavy/postavy-create-toggle';

export default async function PostavyPageEdit() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const canCreate = permissions.canCreate({ role });

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
      {canCreate && (
        <>
          <PostavyCreateToggle />
          <p>Pozn.: Postavy se řadí abecedně.</p>
        </>
      )}
      {postavy.length > 0 ? (
        <PostavyListEdit postavy={postavy} role={role} userId={userId} />
      ) : (
        <p>
          <i>Ještě zde nejsou žádné postavy!</i>
        </p>
      )}
    </div>
  );
}
