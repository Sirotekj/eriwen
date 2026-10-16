'use client';

import { useState } from 'react';
import { Role } from '@prisma/client';

import type { Enemy } from '@/types/types';

import EnemiesItemEdit from './enemies-item-edit';
import EnemiesDelete from './enemies-delete';
import EnemiesForm from '@/components/forms/enemies-form';

type Props = {
  enemies: Enemy[];
  role: Role | undefined;
  userId: string | undefined;
};

export default function EnemiesListEdit({ enemies, role, userId }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClose = () => {
    setEditingId(null);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setEditingId(null);
    setDeleteModal(false);
  };

  return (
    <>
      <ul>
        {enemies.map((enemy) => (
          <li
            key={enemy.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {!deleteModal && editingId === enemy.id ? (
              <div className="form-container">
                <EnemiesForm
                  initialData={enemy}
                  onClose={() => handleClose()}
                />
              </div>
            ) : (
              <EnemiesItemEdit
                enemy={enemy}
                role={role}
                userId={userId}
                handleEdit={() => setEditingId(enemy.id)}
                handleDelete={() => {
                  setEditingId(enemy.id);
                  openDeleteModal();
                }}
              />
            )}
          </li>
        ))}
      </ul>

      {deleteModal && editingId && (
        <EnemiesDelete id={editingId} onClose={() => closeDeleteModal()} />
      )}
    </>
  );
}
