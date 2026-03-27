'use client';

import { Tazeni } from '@prisma/client';
import { useState } from 'react';
import { Role } from '@prisma/client';

import TazeniItem from './tazeni-item';
import TazeniForm from '@/components/forms/tazeni-form';

type Props = {
  tazeni: Tazeni[];
  role: Role | undefined;
  userId: string | undefined;
  isEditing: boolean;
};

const TazeniList = ({ tazeni, role, userId, isEditing }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const handleClose = () => {
    setEditingId(null);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
    <>
      <ul>
        {tazeni.map((t) => (
          <li key={t.id}>
            {editingId === t.id ? (
              <TazeniForm initialData={t} onClose={() => handleClose()} />
            ) : (
              <TazeniItem
                tazeni={t}
                role={role}
                userId={userId}
                isEditing={isEditing}
                handleEdit={() => setEditingId(t.id)}
                handleDelete={() => {
                  setEditingId(t.id);
                  openDeleteModal();
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
export default TazeniList;
