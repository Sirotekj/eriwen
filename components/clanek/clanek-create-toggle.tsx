'use client';

import { useState } from 'react';

import ClanekForm from '@/components/forms/clanek-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

import { ClanekKategorie } from '@prisma/client';

type Props = {
  afterOrder?: string;
  position?: 'start' | 'end';
  kategorie: ClanekKategorie;
};

export default function ClanekCreateToggle({
  afterOrder,
  position,
  kategorie,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <ClanekForm
            onClose={() => setIsOpen(false)}
            afterOrder={afterOrder}
            position={position}
            kategorie={kategorie}
          />
        </div>
      ) : (
        <ButtonPage
          className="my-4"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <IconEdit /> Přidat článek
        </ButtonPage>
      )}
    </>
  );
}
