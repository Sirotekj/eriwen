'use client';

import { useState } from 'react';

import { Lokalita, LokalitaUroven, Role } from '@prisma/client';

import KrajeItemEdit from './kraje-item-edit';
import KrajeDelete from './kraje-delete';
import KrajeForm from '../forms/kraje-form';
type Props = {
  lokality: Lokalita[];
  role: Role | undefined;
  userId: string | undefined;
};

const KrajeListEdit = ({ lokality, role, userId }: Props) => {
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
        {lokality.map((lokalita) => (
          <li
            key={lokalita.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {editingId === lokalita.id ? (
              <KrajeForm
                lokality={lokality}
                initialData={lokalita}
                onClose={() => handleClose()}
              />
            ) : (
              <KrajeItemEdit
                lokalita={lokalita}
                role={role}
                userId={userId}
                handleEdit={() => setEditingId(lokalita.id)}
                handleDelete={() => {
                  setEditingId(lokalita.id);
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
export default KrajeListEdit;
