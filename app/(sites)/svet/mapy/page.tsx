export const dynamic = 'force-dynamic';

import Image from 'next/image';

import { getAllMapa } from '@/lib/mapy-prisma';
import MapyList from '@/components/mapy/mapy-list';

import Divider from '@/components/decorations/divider';

import { buildTree } from '@/components/kraje/kraje-helper';

export default async function MapyPage() {
  const mapy = await getAllMapa();
  const tree = buildTree(mapy);
  return (
    <>
      <h1 className="headline">Mapy</h1>
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

      {mapy.length > 0 ? (
        <MapyList mapy={tree} />
      ) : (
        <>
          <p>
            <i>Ještě zde nejsou žádné mapy!</i>
          </p>
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
      )}
    </>
  );
}
