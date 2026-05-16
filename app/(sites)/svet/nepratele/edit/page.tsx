import Image from 'next/image';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { getNepratele } from '@/lib/clanek-prisma';
import ClanekListEdit from '@/components/clanek/clanek-list-edit';
import ClanekCreateToggle from '@/components/clanek/clanek-create-toggle';

export default async function NepratelePageEdit() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const canCreate = permissions.canCreate({ role });

  const nepratele = await getNepratele();

  return (
    <div>
      <h2>Nepřátelé</h2>
      <p>
        Výčet nepřátel, s nimiž se družina střetla, (ať už je porazila nebo ne).
      </p>

      {canCreate && (
        <>
          <ClanekCreateToggle kategorie="NEPRATELE" />
          <p>Pozn.: Nový nepřítel se přidá na začátek.</p>
        </>
      )}
      {nepratele.length > 0 ? (
        <ClanekListEdit
          clanek={nepratele}
          role={role}
          userId={userId}
          kategorie="NEPRATELE"
        />
      ) : (
        <p>
          <i>Ještě zde nejsou žádní nepřátelé!</i>
        </p>
      )}

      <hr />

      <div>
        <h2>Příklad</h2>
        <h3>Besiah (†)</h3>
        <p>
          <i>Nekromant z kláštera u města Krompach</i>
        </p>
        <p>
          Družina zničila jeho oživlé zombie a zajala ho na zřícenině Reliktark.
          Besiah byl později veřejně upálen v Krompachu jako heretik.
        </p>
        <h3>Isidor Mortirus (†)</h3>
        <p>
          <i>Zvrácený alchymista z Rovaldska</i>
        </p>
        <p>
          Bývalý člen zločinné organizace Černá chiméra. Zabit tlupou cizích
          žoldáků. Družina odhalila jeho doupě a porazila zvrácená monstra,
          která vytvořil - sešívače.
        </p>
      </div>
    </div>
  );
}
