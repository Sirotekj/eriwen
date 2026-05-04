'use client';

import { useState } from 'react';
import { Clanek, ClanekKategorie, Role } from '@prisma/client';

import ClanekItemEdit from './clanek-item-edit';
import ClanekDelete from './clanek-delete';
import ClanekForm from '../forms/clanek-form';

type Props = {
  clanek: Clanek[];
  role: Role | undefined;
  userId: string | undefined;
  kategorie: ClanekKategorie;
};

const ClanekListEdit = ({ clanek, role, userId, kategorie }: Props) => {
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
        {clanek.map((c) => (
          <li
            key={c.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {editingId === c.id ? (
              <ClanekForm
                kategorie={kategorie}
                initialData={c}
                onClose={() => handleClose()}
              />
            ) : (
              <ClanekItemEdit
                clanek={c}
                kategorie={kategorie}
                role={role}
                userId={userId}
                handleEdit={() => setEditingId(c.id)}
                handleDelete={() => {
                  setEditingId(c.id);
                  openDeleteModal();
                }}
              />
            )}
          </li>
        ))}
      </ul>
      {deleteModal && editingId && (
        <ClanekDelete id={editingId} onClose={() => closeDeleteModal()} />
      )}
    </>
  );
};
export default ClanekListEdit;
