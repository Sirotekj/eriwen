export const dynamic = 'force-dynamic';

import { getAllLetopisy } from '@/lib/letopisy-prisma';
import LetopisyList from '@/components/letopisy/letopisy-list';

import Divider from '@/components/decorations/divider';

export default async function LetopisyPage() {
  const letopisy = await getAllLetopisy();
  return (
    <>
      <h1 className="headline">Letopisy</h1>
      <blockquote>
        „Dějiny jsou jako moře. Zdálky vypadají monumentálně, ale když jste
        uprostřed, tak se vám dělá špatně.“
        <span>Gabriel Laub</span>
      </blockquote>

      {letopisy.length > 0 ? (
        <LetopisyList letopisy={letopisy} />
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
