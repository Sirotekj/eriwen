export const dynamic = 'force-dynamic';

import { getSpolky } from '@/lib/clanek-prisma';
import ClanekList from '@/components/clanek/clanek-list';

import Divider from '@/components/decorations/divider';

export default async function SpolkyPage() {
  const spolky = await getSpolky();
  return (
    <>
      <h1 className="headline">Řády a spolky</h1>
      {/*<blockquote>
        „Náboženství se střídají, pivo a víno zůstávají.“
        <span>Harvey Allen</span>
      </blockquote>*/}
      <p>Známé řády a spolky.</p>

      {spolky.length > 0 ? (
        <ClanekList clanek={spolky} />
      ) : (
        <>
          <p>
            <i>Ještě zde nejeou žádné řády a spolky!</i>
          </p>
          <Divider />

          {/*<div>
            <h2>Příklad</h2>
            <h3>Kult Morroka</h3>
          </div>*/}
        </>
      )}
    </>
  );
}
