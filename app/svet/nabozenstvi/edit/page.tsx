import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { getNabozenstvi } from '@/lib/clanek-prisma';
import ClanekListEdit from '@/components/clanek/clanek-list-edit';
import ClanekCreateToggle from '@/components/clanek/clanek-create-toggle';

export default async function NabozenstviPageEdit() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const canCreate = permissions.canCreate({ role });

  const nabozenstvi = await getNabozenstvi();
  return (
    <div>
      <h2>Náboženství</h2>
      <blockquote>
        „Náboženství se střídají, pivo a víno zůstávají.“
        <span>Harvey Allen</span>
      </blockquote>
      <p>Známá náboženství ve světě.</p>

      {canCreate && (
        <>
          <ClanekCreateToggle kategorie="NABOZENSTVI" />
          <p>Pozn.: Nové náboženství se přidá na začátek.</p>
        </>
      )}
      {nabozenstvi.length > 0 ? (
        <ClanekListEdit
          clanek={nabozenstvi}
          role={role}
          userId={userId}
          kategorie="NABOZENSTVI"
        />
      ) : (
        <p>
          <i>Ještě zde není žádné náboženství!</i>
        </p>
      )}

      <hr />

      <div>
        <h2>Příklad</h2>
        <p>Nejrozšířenější polyteismus</p>
        <h3>Hlavní bohové</h3>
        <p>
          bůh stvořitel (symbol světla - hvězda) - <strong>Isil</strong>
          <br />
          bůh ničitel - <strong>Perderos</strong>
          <br />
          bůh země - <strong>Teris</strong>
          <br />
          bůh ohně - <strong>Ignis</strong>
          <br />
          bůh vody - <strong>Akvion</strong>
          <br />
          bůh vzduchu - <strong>Éra</strong>
        </p>
      </div>
    </div>
  );
}
