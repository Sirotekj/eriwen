'use client';

import { useState } from 'react';
import LetopisyForm from '@/components/forms/letopisy-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

export default function LetopisyCreateToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <LetopisyForm onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <ButtonPage
          className="my-4"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <IconEdit /> Přidat událost
        </ButtonPage>
      )}
    </>
  );
}
