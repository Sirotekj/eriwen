'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import type { Enemy } from '@/types/types';
import ButtonPage from '@/components/utils/button-page';
import ImagePicker from '@/components/forms/image-picker';

type Props = {
  onClose: () => void;
  initialData?: Enemy;
};

export default function EnemiesForm({ onClose, initialData }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setErrors([]);
    setMessages([]);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();

    if (!name) {
      setMessages(['Chybí jméno!']);
      setPending(false);
      return;
    }

    try {
      const response = await fetch(
        initialData?.id ? `/api/enemies/${initialData.id}` : '/api/enemies',
        {
          method: initialData?.id ? 'PUT' : 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrors([data?.error ?? 'Uložení se nezdařilo.']);
        setPending(false);
        return;
      }

      router.refresh();
      onClose();
    } catch {
      setErrors(['Nepodařilo se spojit s API.']);
      setPending(false);
    }
  };

  return (
    <>
      <header className="mb-4">
        {initialData ? 'Upravit nepřítele' : 'Přidat nepřítele'}
      </header>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Jméno:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={initialData?.name ?? ''}
          className="form-input"
          required
        />

        <label htmlFor="type">Typ</label>
        <input
          type="text"
          id="type"
          name="type"
          defaultValue={initialData?.type ?? ''}
          className="form-input"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="health">Životy:</label>
            <input
              type="number"
              id="health"
              name="health"
              defaultValue={initialData?.health ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="level">Úroveň:</label>
            <input
              type="number"
              id="level"
              name="level"
              defaultValue={initialData?.level ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="mana">Mana:</label>
            <input
              type="number"
              id="mana"
              name="mana"
              defaultValue={initialData?.mana ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="favor">Přízeň:</label>
            <input
              type="number"
              id="favor"
              name="favor"
              defaultValue={initialData?.favor ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="adrenaline">Adrenalin:</label>
            <input
              type="number"
              id="adrenaline"
              name="adrenaline"
              defaultValue={initialData?.adrenaline ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="divinePower">Vyšší moc:</label>
            <input
              type="number"
              id="divinePower"
              name="divinePower"
              defaultValue={initialData?.divinePower ?? ''}
              className="form-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div>
            <label htmlFor="strength">SIL:</label>
            <input
              type="number"
              id="strength"
              name="strength"
              defaultValue={initialData?.strength ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="dexterity">OBR:</label>
            <input
              type="number"
              id="dexterity"
              name="dexterity"
              defaultValue={initialData?.dexterity ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="constitution">ODO:</label>
            <input
              type="number"
              id="constitution"
              name="constitution"
              defaultValue={initialData?.constitution ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="intelligence">INT:</label>
            <input
              type="number"
              id="intelligence"
              name="intelligence"
              defaultValue={initialData?.intelligence ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="charisma">CHAR:</label>
            <input
              type="number"
              id="charisma"
              name="charisma"
              defaultValue={initialData?.charisma ?? ''}
              className="form-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="size">Velikost:</label>
            <input
              type="text"
              id="size"
              name="size"
              defaultValue={initialData?.size ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="movement">Pohyblivost:</label>
            <input
              type="number"
              id="movement"
              name="movement"
              defaultValue={initialData?.movement ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="attackValue">Útočné číslo:</label>
            <input
              type="number"
              id="attackValue"
              name="attackValue"
              defaultValue={initialData?.attackValue ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="damageValue">Zranění:</label>
            <input
              type="number"
              id="damageValue"
              name="damageValue"
              defaultValue={initialData?.damageValue ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="baseDefense">Základní obrana:</label>
            <input
              type="number"
              id="baseDefense"
              name="baseDefense"
              defaultValue={initialData?.baseDefense ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="defenseValue">Obranné číslo:</label>
            <input
              type="number"
              id="defenseValue"
              name="defenseValue"
              defaultValue={initialData?.defenseValue ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="experiencePoints">Zkušenosti:</label>
            <input
              type="number"
              id="experiencePoints"
              name="experiencePoints"
              defaultValue={initialData?.experiencePoints ?? ''}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="challengeRating">Výzva:</label>
            <input
              type="text"
              id="challengeRating"
              name="challengeRating"
              defaultValue={initialData?.challengeRating ?? ''}
              className="form-input"
            />
          </div>
        </div>

        <label htmlFor="specialAbilities">Zvláštní schopnosti:</label>
        <input
          type="text"
          id="specialAbilities"
          name="specialAbilities"
          defaultValue={initialData?.specialAbilities ?? ''}
          className="form-input"
        />

        <label htmlFor="resistances">Rezistence:</label>
        <input
          type="text"
          id="resistances"
          name="resistances"
          defaultValue={initialData?.resistances ?? ''}
          className="form-input"
        />

        <label htmlFor="immunities">Imunita:</label>
        <input
          type="text"
          id="immunities"
          name="immunities"
          defaultValue={initialData?.immunities ?? ''}
          className="form-input"
        />

        <label htmlFor="weaknesses">Slabina:</label>
        <input
          type="text"
          id="weaknesses"
          name="weaknesses"
          defaultValue={initialData?.weaknesses ?? ''}
          className="form-input"
        />

        <label htmlFor="skills">Dovednosti:</label>
        <input
          type="text"
          id="skills"
          name="skills"
          defaultValue={initialData?.skills ?? ''}
          className="form-input"
        />

        <label htmlFor="habitat">Výskyt:</label>
        <input
          type="text"
          id="habitat"
          name="habitat"
          defaultValue={initialData?.habitat ?? ''}
          className="form-input"
        />

        <ImagePicker
          label="Váš obrázek:"
          name="image"
          width="small"
          defaultImage={initialData?.image ?? undefined}
          defaultMultiply={initialData?.imageMultiply ?? false}
        />

        <label htmlFor="description">Popis:</label>
        <textarea
          id="description"
          name="description"
          defaultValue={initialData?.description ?? ''}
          className="form-textarea"
          rows={4}
        />

        <label htmlFor="notes">Poznámky:</label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={initialData?.notes ?? ''}
          className="form-textarea"
          rows={3}
        />

        <label className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            defaultChecked={initialData?.isPublic ?? false}
          />
          Veřejný nepřítel
        </label>

        {messages.length > 0 && (
          <ul>
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error} className="text-red">
                {error}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="cursor-pointer border rounded-sm p-1 hover:shadow-md hover:bg-background/10"
            disabled={pending}
          >
            <strong>{pending ? 'Zpracovávám...' : 'Potvrdit'}</strong>
          </button>
          <ButtonPage onClick={onClose} disabled={pending}>
            Zrušit
          </ButtonPage>
        </div>
      </form>
    </>
  );
}
