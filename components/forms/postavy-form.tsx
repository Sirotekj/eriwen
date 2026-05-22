'use client';

import { useActionState } from 'react';
//import { useRouter } from 'next/navigation';

import { Postava } from '@prisma/client';

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
  const [state, formAction] = useActionState(createAction, {
    messages: [],
    errors: [],
  });

  /*const router = useRouter();
  useEffect(() => {
    if (state.messages === 'Vytvořeno') {
      router.push('/postavy');
    }
  }, [state, router]);*/
  return (
    <>
      <header className="mb-4">Přidat postavu</header>
      <form action={formAction} className="form">
        <div className="">
          <label htmlFor="jmeno">Jméno:</label>
          <input
            type="text"
            id="jmeno"
            name="jmeno"
            defaultValue={initialData?.jmeno}
            className="form-input"
          />
        </div>
        <label htmlFor="rasa">Rasa:</label>
        <input
          type="text"
          id="rasa"
          name="rasa"
          defaultValue={initialData?.rasa}
          className="form-input"
        />
        <label htmlFor="povolani">Povolání:</label>
        <input
          type="text"
          id="povolani"
          name="povolani"
          defaultValue={initialData?.povolani}
          className="form-input"
        />
        <label htmlFor="tazeni">Tažení:</label>
        <input
          type="text"
          id="tazeni"
          name="tazeni"
          defaultValue={initialData?.tazeni ?? ''}
          className="form-input"
        />
        <label htmlFor="hrac">Hráč:</label>
        <input
          type="text"
          id="hrac"
          name="hrac"
          defaultValue={initialData?.hrac ?? ''}
          className="form-input"
        />
        <label>Popis:</label>
        {/*<textarea
            id="pribeh"
            name="pribeh"
            required
            defaultValue={initialData?.content ?? ''}
            className="form-textarea"
          />*/}
        <JoditRTE name="popis" defaultValue={initialData?.popis ?? ''} />
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
        {initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}
        <div className="flex justify-between mt-4">
          <FormSubmit />
          <ButtonPage onClick={onClose}>
            <strong>Zrušit</strong>
          </ButtonPage>
        </div>
      </form>
    </>
  );
}
