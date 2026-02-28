'use client';

import { useFormState } from 'react-dom';
import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import { createPostava } from '@/lib/actions-postava';

export default function FormTazeni() {
  const [state, formAction] = useFormState(createPostava, { message: null });
  return (
    <>
      <header>Přidat tažení</header>
      <main>
        <form action={formAction}>
          <label htmlFor="jmeno">Jméno:</label>
          <input type="text" id="jmeno" name="jmeno" required />
          <label htmlFor="rasa">Rasa:</label>
          <input type="text" id="rasa" name="rasa" required />
          <label htmlFor="povolani">Povolání:</label>
          <input type="text" id="povolani" name="povolani" required />
          <label htmlFor="tazeni">Tažení:</label>
          <input type="text" id="tazeni" name="tazeni" />
          <label htmlFor="pribeh">Popis:</label>
          <textarea id="pribeh" name="pribeh" required />
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <FormSubmit />
        </form>
      </main>
    </>
  );
}
