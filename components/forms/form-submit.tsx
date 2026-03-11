'use client';

import { useFormStatus } from 'react-dom';
//import ButtonPage from '@/components/utils/button-page';

export default function FormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      className="cursor-pointer border rounded-sm p-1 col-start-4 hover:shadow-lg"
      disabled={pending}
    >
      <strong>{pending ? 'Zpracovávám...' : 'Potvrdit'}</strong>
    </button>
  );
}
