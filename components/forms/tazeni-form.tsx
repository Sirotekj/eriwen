'use client';

import { Tazeni } from '@prisma/client';

import { useActionState } from 'react';

import { createAction } from '@/lib/tazeni-actions';
import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import ButtonPage from '@/components/utils/button-page';

type Props = {
  onClose: () => void;
  initialData?: Tazeni;
};

export default function TazeniForm({ onClose, initialData }: Props) {
  const [state, formAction] = useActionState(createAction, { message: null });
  return (
    <>
      <h4>Přidat tažení</h4>
      <main>
        <form
          action={formAction}
          className="border grid grid-cols-[120px_auto_120px_auto] gap-x-2 gap-y-4 p-4 mb-8 rounded-sm"
        >
          <label htmlFor="jmeno">Název:</label>
          <input
            type="text"
            id="jmeno"
            name="jmeno"
            defaultValue={initialData?.jmeno ?? ''}
            className="rounded-sm border"
            required
          />
          <label htmlFor="vypravec">PJ:</label>
          <input
            type="text"
            id="vypravec"
            name="vypravec"
            className="rounded-sm border"
            required
          />
          <label htmlFor="postavy">Postavy:</label>
          <input
            type="text"
            id="postavy"
            name="postavy"
            className="rounded-sm border"
            required
          />
          <label htmlFor="obdobi">Časové období:</label>
          <input
            type="text"
            id="obdobi"
            name="obdobi"
            className="rounded-sm border"
            required
          />
          <label htmlFor="order">Pořadí:</label>
          <input
            type="text"
            id="order"
            name="order"
            className="rounded-sm border"
            required
          />
          <label htmlFor="pribeh" className="col-start-1">
            Příběh:
          </label>
          <textarea
            id="pribeh"
            name="pribeh"
            className="rounded-sm border col-start-2 col-end-5"
            required
          />
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <div className="flex justify-between mt-4">
            <FormSubmit />
            <ButtonPage onClick={onClose}>
              <strong>Zrušit</strong>
            </ButtonPage>
          </div>
        </form>
      </main>
    </>
  );
}
