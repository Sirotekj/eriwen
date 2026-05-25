export const dynamic = 'force-dynamic';

import { getNabozenstvi } from '@/lib/clanek-prisma';
import ClanekList from '@/components/clanek/clanek-list';

import Divider from '@/components/decorations/divider';

export default async function NabozenstviPage() {
  const nabozenstvi = await getNabozenstvi();
  return (
    <>
      <h1 className="headline">Náboženství</h1>
      <blockquote>
        „Náboženství se střídají, pivo a víno zůstávají.“
        <span>Harvey Allen</span>
      </blockquote>
      <p>Známá náboženství ve světě.</p>

      {nabozenstvi.length > 0 ? (
        <ClanekList clanek={nabozenstvi} />
      ) : (
        <>
          <p>
            <i>Ještě zde není žádné náboženství!</i>
          </p>
          <Divider />

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
        </>
      )}
    </>
  );
}
