'use client';

import { Tazeni } from '@prisma/client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { createAction } from '@/lib/tazeni-actions';
import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import ButtonPage from '@/components/utils/button-page';

import JoditRTE from './jodit-rte';

type Props = {
  onClose: () => void;
  afterOrder?: number;
  initialData?: Tazeni;
};

export default function TazeniForm({
  onClose,
  initialData,
  afterOrder,
}: Props) {
  const [state, formAction] = useActionState(createAction, { message: null });
  const router = useRouter();

  useEffect(() => {
    if (state.message === 'created') {
      router.push('/tazeni');
    }
  }, [state, router]);
  return (
    <>
      <header>Přidat tažení</header>
      <main>
        <form action={formAction} className="form">
          <div className="grid grid-cols-[100px_auto_100px_auto] gap-x-2 gap-y-4">
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
          </div>
          <label className="col-start-1">Příběh:</label>
          <JoditRTE name="pribeh" defaultValue={initialData?.pribeh ?? ''} />
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <div className="flex justify-between mt-4">
            <FormSubmit />
            <ButtonPage type="button" onClick={onClose}>
              <strong>Zrušit</strong>
            </ButtonPage>
          </div>
          {afterOrder && (
            <input type="hidden" name="afterOrder" value={afterOrder} />
          )}
        </form>
      </main>
    </>
  );
}
