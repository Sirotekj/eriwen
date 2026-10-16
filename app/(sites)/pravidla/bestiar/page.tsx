export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';

import Divider from '@/components/decorations/divider';
import type { Enemy } from '@/types/types';

function attributeModifier(value: number | null) {
  if (value === null) return null;
  const modifier = Math.floor((value - 10) / 2);
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

function formatAttribute(label: string, value: number | null) {
  if (value === null) return null;
  const modifier = attributeModifier(value);
  return `${label} ${value}${modifier ? ` (${modifier})` : ''}`;
}

async function getEnemies(): Promise<Enemy[]> {
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = headerList.get('x-forwarded-proto') ?? 'http';
  const cookie = headerList.get('cookie');

  if (!host) return [];

  const response = await fetch(`${protocol}://${host}/api/enemies`, {
    cache: 'no-store',
    headers: cookie ? { cookie } : undefined,
  });

  if (!response.ok) return [];
  return response.json();
}

function EnemyCard({ enemy }: { enemy: Enemy }) {
  const attributes = [
    formatAttribute('SIL', enemy.strength),
    formatAttribute('OBR', enemy.dexterity),
    formatAttribute('ODO', enemy.constitution),
    formatAttribute('INT', enemy.intelligence),
    formatAttribute('CHAR', enemy.charisma),
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="mb-10">
      <h3>
        {enemy.name}
        {enemy.type ? ` - ${enemy.type}` : ''}
      </h3>

      <table className="text-left w-full">
        <tbody>
          <tr>
            <td className="p-1 w-1/2 border">
              Životy: {enemy.health ?? '—'}
              {enemy.mana !== null ? `, Mana: ${enemy.mana}` : ''}
            </td>
            <td className="p-1 border">Úroveň: {enemy.level ?? '—'}</td>
          </tr>
          <tr>
            <td className="p-1 border">
              Atributy: {attributes || '—'}
            </td>
            <td className="p-1 border">Velikost: {enemy.size ?? '—'}</td>
          </tr>
          <tr>
            <td className="p-1 border">
              Útočné číslo:{' '}
              {enemy.attackValue !== null
                ? `${enemy.attackValue}${
                    enemy.damageValue !== null ? `/${enemy.damageValue}` : ''
                  }`
                : '—'}
            </td>
            <td className="p-1 border">
              Pohyblivost: {enemy.movement ?? '—'}
            </td>
          </tr>
          <tr>
            <td className="p-1 border">
              Základní obrana: {enemy.baseDefense ?? '—'}
              {enemy.defenseValue !== null
                ? `, Obranné číslo: ${enemy.defenseValue}`
                : ''}
              {enemy.specialAbilities
                ? `, Zvl. schopnost: ${enemy.specialAbilities}`
                : ''}
            </td>
            <td className="p-1 border">
              {enemy.challengeRating
                ? `Obtížnost: ${enemy.challengeRating}`
                : ''}
            </td>
          </tr>
          <tr>
            <td className="p-1 border">
              Zkušenost: {enemy.experiencePoints ?? '—'}
            </td>
            <td className="p-1 border">
              {enemy.habitat ? `Prostředí: ${enemy.habitat}` : ''}
            </td>
          </tr>
        </tbody>
      </table>

      {enemy.description && <p>{enemy.description}</p>}
      {enemy.notes && <p>{enemy.notes}</p>}
    </div>
  );
}

function ExampleEnemy() {
  return (
    <div>
      <h2>Příklad</h2>
      <h3>Řasnatec - malý</h3>
      <table className="text-left">
        <tbody>
          <tr>
            <td className="p-1 w-1/2 border">Životy: 21</td>
            <td className="p-1 border">Úroveň: 4</td>
          </tr>
          <tr>
            <td className="p-1 border">
              Atributy: SIL 14 (+2), OBR 14 (+2), ODO 14 (+2), INT 1 (-5), CHAR
              9 (-1)
            </td>
            <td className="p-1 border">Velikost: B</td>
          </tr>
          <tr>
            <td className="p-1 border">
              Útočné číslo: (2+4/+1) = 6/+1 (zuby, drápy)
            </td>
            <td className="p-1 border"></td>
          </tr>
          <tr>
            <td className="p-1 border">
              Základní obrana: (2+1) = 3 (řasy) Zvl. schopnost: termovize, 2 ú/o
              za kolo, pasti* Obranné číslo: (2+1+3) = 6 (řasy)
            </td>
            <td className="p-1 border"></td>
          </tr>
          <tr>
            <td className="p-1 border">Pohyblivost: 40</td>
            <td className="p-1 border"></td>
          </tr>
          <tr>
            <td className="p-1 border">Zkušenost: 100</td>
            <td className="p-1 border">Poklad: kyselina</td>
          </tr>
        </tbody>
      </table>
      <p>
        *v doupěti mívá pasti ze svých slin, louže kolem 30 coulů. Past Postřeh
        - 6, nebo má přilepeno na botách - do 3 kol prožere boty a pak 1.kolo -
        Past ODO 10 (2 životy dolů), 2.kolo - Past ODO 8 (2 životy dolů),
        3.kolo - Past ODO 6 (1 život dolů), 4.kolo - Past ODO 4 (1 život dolů)
      </p>
    </div>
  );
}

export default async function BestiarPage() {
  const enemies = await getEnemies();

  return (
    <>
      <h1 className="headline">Bestiář</h1>
      <p>Stránka je v přípravě!</p>
      <p>
        Tady můžete najít vymyšlené stvůry a nepřátele, kteří jsou důležití,
        nebo se můžou hodit do budoucna.
      </p>
      <p>
        Seznam se skládá z veřejných nepřátel, kteří jsou viditelní pro všechny
        a poté pro přihlášené jsou zde i nepřátelé neveřejní, kteří z důvodů
        Vypravěčů vidí jen jejich uživatel.
      </p>

      <Divider />

      {enemies.length > 0 ? (
        enemies.map((enemy) => <EnemyCard key={enemy.id} enemy={enemy} />)
      ) : (
        <>
          <p>
            <i>Zatím zde nejsou žádní nepřátelé.</i>
          </p>
          <Divider />
          <ExampleEnemy />
        </>
      )}
    </>
  );
}
