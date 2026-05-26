'use client';

import { useState } from 'react';
import { Letopisy, Role } from '@prisma/client';

import LetopisyItemEdit from './letopisy-item-edit';
import LetopisyDelete from './letopisy-delete';
import LetopisyForm from '../forms/letopisy-form';

import { getSortedLetopisy } from './kalendar';

type Props = {
  letopisy: Letopisy[];
  role: Role | undefined;
  userId: string | undefined;
};

const LetopisyListEdit = ({ letopisy, role, userId }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const sortedLetopisy = getSortedLetopisy(letopisy);

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
        {sortedLetopisy.map((l) => (
          <li
            key={l.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {!deleteModal && editingId === l.id ? (
              <div className="form-container">
                <LetopisyForm initialData={l} onClose={() => handleClose()} />
              </div>
            ) : (
              <LetopisyItemEdit
                letopisy={l}
                role={role}
                userId={userId}
                handleEdit={() => setEditingId(l.id)}
                handleDelete={() => {
                  setEditingId(l.id);
                  openDeleteModal();
                }}
              />
            )}
          </li>
        ))}
      </ul>
      {deleteModal && editingId && (
        <LetopisyDelete id={editingId} onClose={() => closeDeleteModal()} />
      )}
    </>
  );
};
export default LetopisyListEdit;
