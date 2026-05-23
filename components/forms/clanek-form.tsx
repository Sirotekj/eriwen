'use client';

import { ClanekKategorie } from '@prisma/client';
import { ClanekView } from '@/types/types';

import { useActionState } from 'react';

import { createAction } from '@/lib/clanek-actions';

import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import ButtonPage from '@/components/utils/button-page';

import JoditRTE from './jodit-rte';

type Props = {
  onClose: () => void;
  initialData?: ClanekView;

  afterOrder?: string;
  position?: 'start' | 'end';
  kategorie: ClanekKategorie;
};

export default function ClanekForm({
  onClose,
  initialData,
  afterOrder,
  position,
  kategorie,
}: Props) {
  const [state, formAction] = useActionState(createAction, {
    messages: [],
    errors: [],
  });

  return (
    <>
      <header className="mb-4">Přidat článek</header>
      <form action={formAction} className="form">
        {initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}
        <div className="grid grid-cols-[100px_auto_100px_auto] gap-x-2 gap-y-4">
          <label htmlFor="nazev">Název:</label>
          <input
            type="text"
            id="nazev"
            name="nazev"
            defaultValue={initialData?.nazev ?? ''}
            className="rounded-sm border"
          />
        </div>
        <label className="col-start-1">Obsah:</label>
        <JoditRTE name="obsah" defaultValue={initialData?.obsah ?? ''} />
        <ImagePicker
          label="Váš obrázek:"
          name="image"
          width="small"
          defaultImage={initialData?.image ?? undefined}
        />

        {state.errors && (
          <ul className="text-red mt-2">
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {state.messages && (
          <ul className="text-red">
            {state.messages.map((message) => (
              <li key={message} className="text-red">
                {message}
              </li>
            ))}
          </ul>
        )}

        {afterOrder && (
          <input type="hidden" name="afterOrder" value={afterOrder} />
        )}
        {position && <input type="hidden" name="position" value={position} />}
        <input type="hidden" name="kategorie" value={kategorie} />

        <div className="flex justify-between mt-4">
          <FormSubmit />
          <ButtonPage type="button" onClick={onClose}>
            <strong>Zrušit</strong>
          </ButtonPage>
        </div>
      </form>
    </>
  );
}
