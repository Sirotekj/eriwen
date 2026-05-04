'use client';

import { useState } from 'react';
import PostavyForm from '@/components/forms/postavy-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

export default function PostavyCreateToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <PostavyForm onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <ButtonPage
          className="my-4"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <IconEdit /> Přidat postavu
        </ButtonPage>
      )}
    </>
  );
}
