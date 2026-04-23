export const dynamic = 'force-dynamic';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getEditMode } from '@/lib/edit-mode';
import { permissions } from '@/lib/permissions';

import { PageProps } from '@/types/types';
import { getPostavy } from '@/lib/postavy-prisma';
import PostavyList from '@/components/postavy/postavy-list';
import PostavyCreateToggle from '@/components/postavy/postavy-create-toggle';

export default async function PostavyPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const params = await searchParams;
  const editParamOn = params.edit === '1';

  const { isEditing } = getEditMode(role, editParamOn);

  const canCreate = permissions.canCreate({ role });

  const postavy = await getPostavy();

  return (
    <div>
      <h2>Postavy</h2>
      <blockquote></blockquote>
      <p>
        Zde můžete najít stručný popis postav a jakých tažení se zúčastnili.
      </p>
      {isEditing && canCreate && (
        <>
          <PostavyCreateToggle />
          <p>Pozn.: Postavy se řadí abecedně.</p>
        </>
      )}
      <PostavyList
        postavy={postavy}
        role={role}
        userId={userId}
        isEditing={isEditing}
      />
    </div>
  );
}
