'use client';

import { useState } from 'react';
import { Tazeni, Role } from '@prisma/client';

import TazeniItemEdit from './tazeni-item-edit';
import TazeniDelete from './tazeni-delete';
import TazeniForm from '../forms/tazeni-form';

type Props = {
  tazeni: Tazeni[];
  role: Role | undefined;
  userId: string | undefined;
};

const TazeniListEdit = ({ tazeni, role, userId }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

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
        {tazeni.map((tazeni, index) => (
          <li
            key={tazeni.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {!deleteModal && editingId === tazeni.id ? (
              <div className="form-container">
                <TazeniForm
                  initialData={tazeni}
                  onClose={() => handleClose()}
                />
              </div>
            ) : (
              <TazeniItemEdit
                index={index + 1}
                tazeni={tazeni}
                role={role}
                userId={userId}
                handleEdit={() => setEditingId(tazeni.id)}
                handleDelete={() => {
                  setEditingId(tazeni.id);
                  openDeleteModal();
                }}
              />
            )}
          </li>
        ))}
      </ul>
      {deleteModal && editingId && (
        <TazeniDelete id={editingId} onClose={() => closeDeleteModal()} />
      )}
    </>
  );
};
export default TazeniListEdit;
