'use client';

import { useState } from 'react';
import MapyForm from '@/components/forms/mapy-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

import { Mapa } from '@prisma/client';
import { LokalitaTree } from '../kraje/kraje-helper';

type Props = {
  allMapy: Mapa[];
  mapy: LokalitaTree[];
  afterOrder?: string;
};

export default function KrajeCreateToggle({
  allMapy,
  mapy,
  afterOrder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <MapyForm
            allMapy={allMapy}
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
