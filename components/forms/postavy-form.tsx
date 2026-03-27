'use client';

import { Postava } from '@prisma/client';

import { useActionState } from 'react';

import { createAction } from '@/lib/postavy-actions';
import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import ButtonPage from '@/components/utils/button-page';

import JoditRTE from './jodit-rte';

type Props = {
  onClose: () => void;
  initialData?: Postava;
};

export default function PostavayForm({ onClose, initialData }: Props) {
  //const [state, formAction] = useFormState(createPostava, { message: null });
  const [state, formAction] = useActionState(createAction, { message: null });
  return (
    <>
      <header>Přidání postavy</header>
      <main>
        <form action={formAction} className="form">
          <div className="">
            <label htmlFor="jmeno">Jméno:</label>
            <input
              type="text"
              id="jmeno"
              name="jmeno"
              defaultValue={initialData?.name}
              required
              className="form-input"
            />
          </div>
          <label htmlFor="rasa">Rasa:</label>
          <input
            type="text"
            id="rasa"
            name="rasa"
            defaultValue={initialData?.race}
            required
            className="form-input"
          />
          <label htmlFor="povolani">Povolání:</label>
          <input
            type="text"
            id="povolani"
            name="povolani"
            defaultValue={initialData?.profession}
            required
            className="form-input"
          />
          <label htmlFor="tazeni">Tažení:</label>
          <input
            type="text"
            id="tazeni"
            name="tazeni"
            defaultValue={initialData?.campaign ?? ''}
            className="form-input"
          />
          <label htmlFor="hrac">Hráč:</label>
          <input
            type="text"
            id="hrac"
            name="hrac"
            defaultValue={initialData?.player ?? ''}
            className="form-input"
          />
          <label htmlFor="popis">Popis:</label>
          {/*<textarea
            id="pribeh"
            name="pribeh"
            required
            defaultValue={initialData?.content ?? ''}
            className="form-textarea"
          />*/}
          <JoditRTE name="popis" defaultValue={initialData?.content ?? ''} />
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
