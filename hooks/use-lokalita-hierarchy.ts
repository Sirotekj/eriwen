'use client';

import { useMemo, useState } from 'react';
import { Lokalita, LokalitaUroven } from '@prisma/client';
import { getHierarchy } from '@/components/kraje/kraje-helper';

type Props = {
  lokality: Lokalita[];
  initialData?: Lokalita | null;
};

export function useLokalitaHierarchy({ lokality, initialData }: Props) {
  const [type, setType] = useState<LokalitaUroven>(
    initialData?.uroven ?? 'SVET',
  );
  const hierarchy = getHierarchy(lokality, initialData);

  const [selectedSvet, setSelectedSvet] = useState<string | undefined>(
    hierarchy.svetId,
  );

  const [selectedKralovstvi, setSelectedKralovstvi] = useState<
    string | undefined
  >(hierarchy.kralovstviId);

  const [selectedKraj, setSelectedKraj] = useState<string | undefined>(
    hierarchy.krajId,
  );

  // SVETY
  const svety = useMemo(
    () => lokality.filter((l) => l.uroven === 'SVET'),
    [lokality],
  );

  // KRALOVSTVI
  const kralovstvi = useMemo(
    () =>
      lokality.filter(
        (l) => l.uroven === 'KRALOVSTVI' && l.parentId === selectedSvet,
      ),
    [lokality, selectedSvet],
  );

  // KRAJE
  const kraje = useMemo(
    () =>
      lokality.filter(
        (l) => l.uroven === 'KRAJ' && l.parentId === selectedKralovstvi,
      ),
    [lokality, selectedKralovstvi],
  );

  // parentId pro submit
  function resolveParentId() {
    switch (type) {
      case 'KRALOVSTVI':
        return selectedSvet;

      case 'KRAJ':
        return selectedKralovstvi;

      case 'MISTO':
        return selectedKraj;

      default:
        return null;
    }
  }

  return {
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
  };
}
