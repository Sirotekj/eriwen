'use client';

import { Mapa, LokalitaUroven } from '@prisma/client';

import { useActionState } from 'react';

import { createAction } from '@/lib/mapy-actions';

import { useLokalitaHierarchy } from '@/hooks/use-lokalita-hierarchy';
import { LokalitaTree } from '../kraje/kraje-helper';

import ImagePicker from '@/components/forms/image-picker';
import FormSubmit from '@/components/forms/form-submit';
import ButtonPage from '@/components/utils/button-page';

import JoditRTE from './jodit-rte';

type Props = {
  allMapy: Mapa[];
  mapy: LokalitaTree[];
  onClose: () => void;
  afterOrder?: string;
  initialData?: Mapa;
};

export default function MapyForm({ allMapy, initialData, onClose }: Props) {
  const [state, formAction] = useActionState(createAction, {
    messages: [],
    errors: [],
  });
  const allLokality = allMapy;

  const {
    type,
    setType,

    svety,
    kralovstvi,
    kraje,

    selectedSvet,
    setSelectedSvet,

    selectedKralovstvi,
    setSelectedKralovstvi,

    selectedKraj,
    setSelectedKraj,

    resolveParentId,
  } = useLokalitaHierarchy({
    allLokality,
    initialData,
  });

  return (
    <>
      <header className="mb-4">Přidat mapu</header>
      <form action={formAction} className="form">
        {initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}
        {/* uroven */}
        <label htmlFor="uroven">
          Nejprve vyber úroveň, zda budeš vytvářet mapu světa, království, kraje
          nebo místa.
        </label>
        <select
          name="uroven"
          title="uroven"
          value={type}
          onChange={(e) => setType(e.target.value as LokalitaUroven)}
          className="form-select block mb-4"
        >
          <option value="SVET">Svět</option>
          <option value="KRALOVSTVI">Království</option>
          <option value="KRAJ">Kraj</option>
          <option value="MISTO">Místo</option>
        </select>

        {type === 'SVET' ? (
          ''
        ) : (
          <p>
            {type === 'KRALOVSTVI' &&
              (svety.length > 0
                ? 'Vyber svět, ve kterém se království nachází.'
                : 'Nejprve musí existovat svět, ve kterém se království nachází.')}
            {type === 'KRAJ' &&
              (kralovstvi.length > 0
                ? 'Vyber svět a království, ve kterém se kraj nachází.'
                : 'Nejprve musí existovat království, ve kterém se kraj nachází.')}
            {type === 'MISTO' &&
              (kraje.length > 0
                ? 'Vyber svět, království a kraj, ve kterém se místo nachází.'
                : 'Nejprve musí existovat kraj, ve kterém se místo nachází.')}
          </p>
        )}

        {/* SVET */}
        {svety.length > 0 &&
          (type === 'KRALOVSTVI' || type === 'KRAJ' || type === 'MISTO') && (
            <select
              title="svet"
              name="svet"
              value={selectedSvet ?? ''}
              onChange={(e) => {
                setSelectedSvet(e.target.value);
                setSelectedKralovstvi(undefined);
                setSelectedKraj(undefined);
              }}
              className="form-select mb-4 mr-2"
            >
              <option value="">Vyber svět</option>
              {svety.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nazev}
                </option>
              ))}
            </select>
          )}
        {/* KRALOVSTVI */}
        {kralovstvi.length > 0 && (type === 'KRAJ' || type === 'MISTO') && (
          <select
            title="kralovstvi"
            name="kralovstvi"
            value={selectedKralovstvi ?? ''}
            onChange={(e) => {
              setSelectedKralovstvi(e.target.value);
              setSelectedKraj(undefined);
            }}
            className="form-select mb-4 mr-2"
          >
            <option value="">Vyber království</option>
            {kralovstvi.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nazev}
              </option>
            ))}
          </select>
        )}

        {/* KRAJ */}
        {kraje.length > 0 && type === 'MISTO' && (
          <select
            title="kraj"
            name="kraj"
            value={selectedKraj ?? ''}
            onChange={(e) => setSelectedKraj(e.target.value)}
            className="form-select mb-4"
          >
            <option value="">Vyber kraj</option>
            {kraje.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nazev}
              </option>
            ))}
          </select>
        )}

        <label htmlFor="nazev">Název:</label>
        <input
          title="nazev"
          name="nazev"
          defaultValue={initialData?.nazev}
          className="form-input"
        />

        <label className="col-start-1">Popis (nepovinné):</label>
        <JoditRTE name="popis" defaultValue={initialData?.popis ?? ''} />

        <ImagePicker
          label="Váš obrázek (nepovinné):"
          name="image"
          width="full"
          defaultImage={initialData?.image ?? undefined}
        />

        <input type="hidden" name="parentId" value={resolveParentId() ?? ''} />

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
