'use client';

import { useState } from 'react';
import { ClanekKategorie, Role } from '@prisma/client';
import { ClanekView } from '@/types/types';

import ClanekItemEdit from './clanek-item-edit';
import ClanekDelete from './clanek-delete';
import ClanekForm from '../forms/clanek-form';

import { slovoFromKategorie } from '@/lib/helpers';

type Props = {
  //clanek: ClanekType[];
  clanek: ClanekView[];
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
    setEditingId(null);
    setDeleteModal(false);
  };
  return (
    <>
      <ul>
        {clanek.map((c, index) => (
          <li key={c.id}>
            <a className="border-b" href={`#${c.id}`}>
              {index + 1}. {c.nazev}
            </a>
          </li>
        ))}
      </ul>

      <ul>
        {clanek.map((c) => (
          <li
            key={c.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {!deleteModal && editingId === c.id ? (
              <div className="form-container">
                <ClanekForm
                  kategorie={kategorie}
                  initialData={c}
                  onClose={() => handleClose()}
                />
              </div>
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
        <ClanekDelete
          id={editingId}
          slovoKategorie={slovoFromKategorie(kategorie)}
          onClose={() => closeDeleteModal()}
        />
      )}
    </>
  );
};
export default ClanekListEdit;
