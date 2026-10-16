export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';
import type { Enemy } from '@/types/types';

import EnemiesCreateToggle from '@/components/bestiar/enemies-create-toggle';
import EnemiesListEdit from '@/components/bestiar/enemies-list-edit';

async function getEnemies(): Promise<Enemy[]> {
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = headerList.get('x-forwarded-proto') ?? 'http';
  const cookie = headerList.get('cookie');

  if (!host) return [];

  const response = await fetch(`${protocol}://${host}/api/enemies`, {
    cache: 'no-store',
    headers: cookie ? { cookie } : undefined,
  });

  if (!response.ok) return [];
  return response.json();
}

export default async function BestiarPageEdit() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;
  const canCreate = permissions.canCreate({ role });

  const enemies = await getEnemies();

  return (
    <div>
      <h1 className="headline">Bestiář</h1>
      <p>
        Tady můžete spravovat vymyšlené stvůry a nepřátele, kteří jsou důležití,
        nebo se můžou hodit do budoucna.
      </p>

      {canCreate && (
        <>
          <EnemiesCreateToggle />
          <p>Pozn.: Nepřátelé se řadí abecedně.</p>
        </>
      )}

      {enemies.length > 0 ? (
        <EnemiesListEdit enemies={enemies} role={role} userId={userId} />
      ) : (
        <p>
          <i>Ještě zde nejsou žádní nepřátelé!</i>
        </p>
      )}
    </div>
  );
}
