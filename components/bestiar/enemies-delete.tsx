'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ModalWrapper from '@/components/utils/modal-wrapper';

type Props = {
  id: string;
  onClose: () => void;
};

export default function EnemiesDelete({ id, onClose }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setPending(true);
    setError(null);

    try {
      const response = await fetch(`/api/enemies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? 'Smazání se nezdařilo.');
        setPending(false);
        return;
      }

      router.refresh();
      onClose();
    } catch {
      setError('Nepodařilo se spojit s API.');
      setPending(false);
    }
  };

  return (
    <ModalWrapper>
      <div className="bg-white relative p-4 rounded-lg">
        <p>Opravdu chcete smazat nepřítele?</p>
        {error && <p className="mt-2 text-red">{error}</p>}
        <div className="flex justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="text-red cursor-pointer"
          >
            {pending ? 'Mažu...' : 'Smazat'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="cursor-pointer"
          >
            Zrušit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
