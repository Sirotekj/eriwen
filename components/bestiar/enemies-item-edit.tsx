import Image from 'next/image';
import { Role } from '@prisma/client';

import type { Enemy } from '@/types/types';
import { permissions } from '@/lib/permissions';

import EditArticle from '@/components/utils/edit-article';
import ImageWrapper from '@/components/utils/image-wrapper';

type Props = {
  enemy: Enemy;
  role: Role | undefined;
  userId: string | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
};

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

export default function EnemiesItemEdit({
  enemy,
  role,
  userId,
  handleEdit,
  handleDelete,
}: Props) {
  const canEdit = permissions.canEdit({
    role,
    userId,
    authorId: enemy.authorId,
  });

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
    <>
      <h3>
        {enemy.name}
        {enemy.type ? ` - ${enemy.type}` : ''}
        {!enemy.isPublic ? ' (neveřejný)' : ''}
      </h3>

      {enemy.image && (
        <ImageWrapper>
          <Image
            className={`object-cover${enemy.imageMultiply ? ' mix-blend-multiply' : ''}`}
            src={enemy.image}
            alt={enemy.name}
            sizes="242px"
            fill
          />
        </ImageWrapper>
      )}

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
            <td className="p-1 border">Atributy: {attributes || '—'}</td>
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

      {canEdit && (
        <EditArticle
          handleEdit={() => handleEdit()}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
}
