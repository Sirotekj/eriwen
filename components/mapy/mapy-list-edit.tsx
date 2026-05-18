'use client';

import { useState } from 'react';

import { Role } from '@prisma/client';
import { LokalitaTree } from '../kraje/kraje-helper';

import MapyItemEdit from './mapy-item-edit';
import MapyDelete from './mapy-delete';
import MapyForm from '../forms/mapy-form';
type Props = {
  mapy: LokalitaTree[];
  role: Role | undefined;
  userId: string | undefined;
};

const MapyListEdit = ({ mapy, role, userId }: Props) => {
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
        {mapy.map((mapa) => (
          <li
            key={mapa.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {editingId === mapa.id ? (
              <MapyForm
                mapy={mapy}
                initialData={mapa}
                onClose={() => handleClose()}
              />
            ) : (
              <MapyItemEdit
                mapa={mapa}
                role={role}
                userId={userId}
                handleEdit={() => setEditingId(mapa.id)}
                handleDelete={() => {
                  setEditingId(mapa.id);
                  openDeleteModal();
                }}
              />
            )}
          </li>
        ))}
      </ul>
      {deleteModal && editingId && (
        <MapyDelete id={editingId} onClose={() => closeDeleteModal()} />
      )}
    </>
  );
};
export default MapyListEdit;
