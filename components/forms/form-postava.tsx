'use client';

//import { useFormState } from 'react-dom';
import { useActionState } from 'react';
import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import ButtonPage from '@/components/utils/button-page';
import { createAction } from '@/lib/actions-postava';

export default function FormPostava({ onClose }: { onClose: () => void }) {
  //const [state, formAction] = useFormState(createPostava, { message: null });
  const [state, formAction] = useActionState(createAction, { message: null });
  return (
    <>
      <header>Přidání postavy</header>
      <main>
        <form action={formAction} className="form">
          <label htmlFor="jmeno">Jméno:</label>
          <input
            type="text"
            id="jmeno"
            name="jmeno"
            required
            className="form-input"
          />
          <label htmlFor="rasa">Rasa:</label>
          <input
            type="text"
            id="rasa"
            name="rasa"
            required
            className="form-input"
          />
          <label htmlFor="povolani">Povolání:</label>
          <input
            type="text"
            id="povolani"
            name="povolani"
            required
            className="form-input"
          />
          <label htmlFor="tazeni">Tažení:</label>
          <input type="text" id="tazeni" name="tazeni" className="form-input" />
          <label htmlFor="pribeh">Popis:</label>
          <textarea
            id="pribeh"
            name="pribeh"
            required
            className="form-textarea"
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
