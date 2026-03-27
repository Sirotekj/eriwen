'use client';

import { useState } from 'react';
import { Postava, Role } from '@prisma/client';

import PostavyItem from './postavy-item';
import PostavyDelete from './postavy-delete';
import PostavyForm from '../forms/postavy-form';

type Props = {
  postavy: Postava[];
  role: Role | undefined;
  userId: string | undefined;
  isEditing: boolean;
};

const PostavyList = ({ postavy, role, userId, isEditing }: Props) => {
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
        {postavy.map((postava) => (
          <li
            key={postava.id}
            className="relative my-4 after-content-[''] after:block after:clear-both"
          >
            {editingId === postava.id ? (
              <PostavyForm
                initialData={postava}
                onClose={() => handleClose()}
              />
            ) : (
              <PostavyItem
                postava={postava}
                role={role}
                userId={userId}
                isEditing={isEditing}
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
export default PostavyList;
