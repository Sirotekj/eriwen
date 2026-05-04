'use client';

import { useState } from 'react';
import TazeniForm from '@/components/forms/tazeni-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

type Props = {
  afterOrder?: number;
};

export default function TazeniCreateToggle({ afterOrder }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <TazeniForm
            onClose={() => setIsOpen(false)}
            afterOrder={afterOrder}
          />
        </div>
      ) : (
        <ButtonPage
          className="my-4"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <IconEdit /> Přidat tažení
        </ButtonPage>
      )}
    </>
  );
}
