import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { getAllLetopisy } from '@/lib/letopisy-prisma';
import LetopisyListEdit from '@/components/letopisy/letopisy-list-edit';
import LetopisyCreateToggle from '@/components/letopisy/letopisy-create-toggle';

import Divider from '@/components/decorations/divider';

export default async function LetopisyPageEdit() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const canCreate = permissions.canCreate({ role });

  const letopisy = await getAllLetopisy();

  return (
    <>
      <h1 className="headline">Letopisy</h1>
      <blockquote>
        „Dějiny jsou jako moře. Zdálky vypadají monumentálně, ale když jste
        uprostřed, tak se vám dělá špatně.“
        <span>Gabriel Laub</span>
      </blockquote>

      {canCreate && (
        <>
          <LetopisyCreateToggle />
          <p>Pozn.: Nová událsot se přidá podle datumu.</p>
        </>
      )}
      {letopisy.length > 0 ? (
        <LetopisyListEdit letopisy={letopisy} role={role} userId={userId} />
      ) : (
        <>
          <p>
            <i>Ještě zde nejsou žádné události!</i>
          </p>

          <Divider />

          <div>
            <h2>Příklad:</h2>
            <h4>
              732 - <span>jaro</span> - První setkání družiny
            </h4>
            <p>
              Cilka, Kirin a Avpág se potkávají ve vsi Kámen a začíná jejich
              společné dobrodružství.
            </p>
          </div>
        </>
      )}
    </>
  );
}
