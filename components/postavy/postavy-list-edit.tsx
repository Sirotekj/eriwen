'use client';

import { useState } from 'react';
import { Postava, Role } from '@prisma/client';

import PostavyItemEdit from './postavy-item-edit';
import PostavyDelete from './postavy-delete';
import PostavyForm from '../forms/postavy-form';

type Props = {
  postavy: Postava[];
  role: Role | undefined;
  userId: string | undefined;
};

const PostavyListEdit = ({ postavy, role, userId }: Props) => {
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
        {postavy.map((postava) => (
          <li
            key={postava.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {!deleteModal && editingId === postava.id ? (
              <div className="form-container">
                <PostavyForm
                  initialData={postava}
                  onClose={() => handleClose()}
                />
              </div>
            ) : (
              <PostavyItemEdit
                postava={postava}
                role={role}
                userId={userId}
                handleEdit={() => setEditingId(postava.id)}
                handleDelete={() => {
                  setEditingId(postava.id);
                  openDeleteModal();
                }}
              />
            )}
          </li>
        ))}
      </ul>
      {deleteModal && editingId && (
        <PostavyDelete id={editingId} onClose={() => closeDeleteModal()} />
      )}
    </>
  );
};
export default PostavyListEdit;
