'use client';

import { useState } from 'react';

import EnemiesForm from '@/components/forms/enemies-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

export default function EnemiesCreateToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <EnemiesForm onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <ButtonPage
          className="my-4"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <IconEdit /> Přidat nepřítele
        </ButtonPage>
      )}
    </>
  );
}
