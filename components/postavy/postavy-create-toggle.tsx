'use client';

import { useState } from 'react';
import PostavyForm from '@/components/forms/postavy-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

export default function PostavyCreateToggle() {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  if (isOpen) {
    return (
      <div className="form-container">
        <PostavyForm onClose={() => setIsOpen(false)} />
      </div>
    );
  }

  return (
    <ButtonPage
      className="my-4"
      onClick={() => {
        setIsOpen(true);
        console.log(isOpen);
      }}
    >
      <IconEdit /> Přidat postavu
    </ButtonPage>
  );
}
