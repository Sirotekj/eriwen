import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { permissions } from '@/lib/permissions';

import { getLetopisy } from '@/lib/letopisy-prisma';
import LetopisyListEdit from '@/components/letopisy/letopisy-list-edit';
import LetopisyCreateToggle from '@/components/letopisy/letopisy-create-toggle';

import Divider from '@/components/decorations/divider';

export default async function LetopisyPageEdit() {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const userId = session?.user?.id;

  const canCreate = permissions.canCreate({ role });

  const letopisy = await getLetopisy();

  return (
    <>
      <h1 className="headline">Letopisy</h1>
      <blockquote>
        „Dějiny jsou jako moře. Zdálky vypadají monumentálně, ale když jste
        uprostřed, tak se vám dělá špatně.“
        <span>Gabriel Laub</span>
      </blockquote>

      <p>Stránka je v přípravě.</p>

      {canCreate && (
        <>
          {/*<LetopisyCreateToggle />*/}
          <p>Pozn.: Nové náboženství se přidá na začátek.</p>
        </>
      )}
      {letopisy.length > 0 ? (
        {
          /*<LetopisyListEdit letopisy={letopisy} role={role} userId={userId} />*/
        }
      ) : (
        <>
          <p>
            <i>Ještě zde není žádné události!</i>
          </p>

          <Divider />

          <div>
            <h2>Příklad</h2>
            <h3>
              <span>732</span> Velká událost
            </h3>
            <p>Při této události se stalo to a to...</p>
          </div>
        </>
      )}
    </>
  );
}
