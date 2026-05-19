'use client';

import { useState } from 'react';
import MapyForm from '@/components/forms/mapy-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

import { Mapa } from '@prisma/client';

type Props = {
  mapy: Mapa[];
  afterOrder?: string;
};

export default function KrajeCreateToggle({ mapy, afterOrder }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <MapyForm
            mapy={mapy}
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
          <IconEdit /> Přidat mapu
        </ButtonPage>
      )}
    </>
  );
}
