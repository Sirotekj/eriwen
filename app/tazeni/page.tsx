import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getEditMode } from '@/lib/edit-mode';
import { permissions } from '@/lib/permissions';
import { getTazeni } from '@/lib/tazeni';
import FormTazeni from '@/components/forms/form-tazeni';

import { PageProps } from '@/types/types';

export default async function TazeniPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const params = await searchParams;
  const editParamOn = params.edit === '1';

  const { isEditing } = getEditMode(role, editParamOn);

  const canCreate = permissions.canCreate({ role });

  const tazeniList = getTazeni();
  return (
    <div>
      <h2>Tažení</h2>
      {isEditing && canCreate && <FormTazeni />}
      <ul>
        {(await tazeniList).map((tazeni) => {
          const ctx = {
            role,
            userId,
            authorId: tazeni.authorId,
          };
          const canEdit = permissions.canEdit(ctx);
          const canDelete = permissions.canDelete(ctx);
          return (
            <li key={tazeni.id}>
              <h3>{tazeni.name}</h3>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4">
                <dt>PJ:</dt>
                <dd>{tazeni.pj}</dd>
                <dt>Postavy:</dt>
                <dd>{tazeni.postavy}</dd>
                <dt>Časové období:</dt>
                <dd>{tazeni.obdobi}</dd>
              </dl>
              <p>{tazeni.content}</p>
            </li>
          );
        })}
      </ul>
      {/*<div>
        <h3>Kniha Ezargoth</h3>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4">
          <dt>PJ:</dt>
          <dd>Kuba</dd>
          <dt>Postavy:</dt>
          <dd>Cilka, Kirin, Afpág</dd>
          <dt>Časové období:</dt>
          <dd>podzim 742</dd>
        </dl>
        <p>
          Postavy byly najmuty jako doprovod karavany ze vsi Kámen do města
          Krompach. Nesli s sebou dopis starostovi, kde upozorňoval na mizející
          mrtvé z hrobů. Po cestě je přepadli nemrtvé zombie, ale družina je
          pobila. V Krompachu se se starostou dohodli, že vše prošetří, zatímco
          starosta Krompachu poslal pro posili. Stopy družinu dovedly do staré
          zříceniny Reliktark, kde se strhl boj s nekromantem a jeho nemrtvými.
          Nekromant byl odpadlíkem z kláštera boha Isila a chtěl se pomstít.
          Družina po vítězství byla odměněna a nekromant na náměstí v Krompachu
          upálen. V klášteře od té doby hlídají stráže.
        </p>
      </div>*/}
    </div>
  );
}
