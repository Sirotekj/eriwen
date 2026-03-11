'use client';

import { useState } from 'react';
import FormPostava from '@/components/forms/form-postava';
import ButtonPage from '@/components/utils/button-page';
import { IconFeather } from '@/components/utils/svgs/icons';

export default function PostavyCreateToggle() {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  if (isOpen) {
    return (
      <div className="form-container">
        <FormPostava onClose={() => setIsOpen(false)} />
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
      <IconFeather /> Přidat postavu
    </ButtonPage>
  );
}
