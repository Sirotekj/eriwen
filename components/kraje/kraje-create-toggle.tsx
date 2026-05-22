'use client';

import { useState } from 'react';
import KrajeForm from '@/components/forms/kraje-form';
import ButtonPage from '@/components/utils/button-page';
import { IconEdit } from '@/components/utils/svgs/icons';

import { Lokalita } from '@prisma/client';
import { LokalitaTree } from './kraje-helper';

type Props = {
  allLokality: Lokalita[];
  lokality: LokalitaTree[];
  afterOrder?: string;
};

export default function KrajeCreateToggle({
  allLokality,
  lokality,
  afterOrder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="form-container">
          <KrajeForm
            allLokality={allLokality}
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
