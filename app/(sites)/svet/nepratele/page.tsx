export const dynamic = 'force-dynamic';

import Image from 'next/image';

import { getNepratele } from '@/lib/clanek-prisma';
import ClanekList from '@/components/clanek/clanek-list';

import Divider from '@/components/decorations/divider';

export default async function NepratelePage() {
  const nepratele = await getNepratele();
  return (
    <>
      <h1 className="headline">Nepřátelé</h1>
      <p>
        Výčet nepřátel, s nimiž se družina střetla, (ať už je porazila nebo ne).
      </p>

      {nepratele.length > 0 ? (
        <ClanekList clanek={nepratele} />
      ) : (
        <>
          <p>
            <i>Ještě zde nejsou žádní nepřátelé!</i>
          </p>
          <Divider />

          <div>
            <h2>Příklad</h2>
            <h3>Besiah (†)</h3>
            <p>
              <i>Nekromant z kláštera u města Krompach</i>
            </p>
            <p>
              Družina zničila jeho oživlé zombie a zajala ho na zřícenině
              Reliktark. Besiah byl později veřejně upálen v Krompachu jako
              heretik.
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
        </>
      )}
    </>
  );
}
