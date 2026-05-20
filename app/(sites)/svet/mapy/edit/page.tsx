import Image from 'next/image';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { getAllMapa } from '@/lib/mapy-prisma';
import { buildTree } from '@/components/kraje/kraje-helper';

import MapyCreateToggle from '@/components/mapy/mapy-create-toggle';
import MapyListEdit from '@/components/mapy/mapy-list-edit';

import Divider from '@/components/decorations/divider';

export default async function MapyPage() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const canCreate = permissions.canCreate({ role });

  const mapy = await getAllMapa();
  const tree = buildTree(mapy);
  return (
    <>
      <h2>Mapy</h2>
      <blockquote>
        „Veškerá tma světa nemůže uhasit světlo jediné svíčky.“
        <span>František z Assissi</span>
      </blockquote>

      <h3>Struktura</h3>
      <ul className="ml-4">
        <li>
          Eriwen (svět)
          <ul className="ml-4">
            <li>
              Království (Země)
              <ul className="ml-4 list-disc">
                <li>
                  Dainovy hory (Kraj)
                  <ul className="ml-4 list-disc">
                    <li>Krompach (Místo)</li>
                    <li>Kámen</li>
                    <li>Vlkov</li>
                  </ul>
                </li>
                <li>
                  Rovaldsko
                  <ul className="ml-4 list-disc">
                    <li>Byrka</li>
                    <li>Krčma „U netopýra“</li>
                    <li>Hrad Oštěp</li>
                    <li>Donharm</li>
                  </ul>
                </li>

                <li>Kraj: </li>
              </ul>
            </li>

            <li>Země: Zavora</li>
          </ul>
        </li>
      </ul>

      {canCreate && (
        <>
          <MapyCreateToggle mapy={mapy} />
          <p>
            Pozn.: Nové místo se řadí abecedně ve struktuře: svět → království →
            kraj → místo.
          </p>
        </>
      )}
      {mapy.length > 0 ? (
        <MapyListEdit mapy={tree} role={role} userId={userId} />
      ) : (
        <p>
          <i>Ještě zde nejsou žádné mapy!</i>
        </p>
      )}

      <Divider />

      <div>
        <h2>Příklad</h2>
        <h3>Království</h3>
        <div className="border">
          <Image
            className="w-full mix-blend-multiply"
            alt="Království"
            width="3504"
            height="2544"
            src="/images/mapy/kralovstvi.jpg"
          />
        </div>
      </div>
    </>
  );
}
