import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { getSpolky } from '@/lib/clanek-prisma';
import ClanekListEdit from '@/components/clanek/clanek-list-edit';
import ClanekCreateToggle from '@/components/clanek/clanek-create-toggle';

import Divider from '@/components/decorations/divider';

export default async function SpolkyPageEdit() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const canCreate = permissions.canCreate({ role });

  const nabozenstvi = await getSpolky();
  return (
    <>
      <h1 className="headline">Řády a spolky</h1>
      {/*<blockquote>
        „Náboženství se střídají, pivo a víno zůstávají.“
        <span>Harvey Allen</span>
      </blockquote>*/}
      <p>Známá náboženství ve světě.</p>

      {canCreate && (
        <>
          <ClanekCreateToggle kategorie="SPOLKY" />
          <p>Pozn.: Nové náboženství se přidá na začátek.</p>
        </>
      )}
      {nabozenstvi.length > 0 ? (
        <ClanekListEdit
          clanek={nabozenstvi}
          role={role}
          userId={userId}
          kategorie="SPOLKY"
        />
      ) : (
        <>
          <p>
            <i>Ještě zde není žádné náboženství!</i>
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
