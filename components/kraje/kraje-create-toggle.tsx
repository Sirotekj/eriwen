'use client';

import { useState } from 'react';
import KrajeForm from '@/components/forms/kraje-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

import { Lokalita } from '@prisma/client';

type Props = {
  lokality: Lokalita[];
  afterOrder?: string;
};

export default function KrajeCreateToggle({ lokality, afterOrder }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <KrajeForm
            lokality={lokality}
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
          <IconEdit /> Přidat Popis
        </ButtonPage>
      )}
    </>
  );
}
