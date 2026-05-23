'use client';

import { useActionState } from 'react';

import { Letopisy } from '@prisma/client';

import { createAction } from '@/lib/postavy-actions';

import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import ButtonPage from '@/components/utils/button-page';

import JoditRTE from './jodit-rte';
import { FantasyDateField } from '@/components/letopisy/kalendar';

type Props = {
  onClose: () => void;
  initialData?: Letopisy;
};

export default function LetopisyForm({ initialData, onClose }: Props) {
  const [state, formAction] = useActionState(createAction, {
    messages: [],
    errors: [],
  });

  return (
    <>
      <header className="mb-4">Přidat událost</header>
      <form action={formAction} className="form">
        {initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}

        <div className="">
          <label htmlFor="nadpis">Nadpis:</label>
          <input
            type="text"
            id="nadpis"
            name="nadpis"
            defaultValue={initialData?.nadpis}
            className="form-input"
          />
        </div>
        <label>Popis:</label>
        <JoditRTE name="popis" defaultValue={initialData?.popis ?? ''} />

        <FantasyDateField />

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
