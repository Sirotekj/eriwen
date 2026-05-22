'use client';

import { useMemo, useState } from 'react';
import { Lokalita, LokalitaUroven } from '@prisma/client';
import { getHierarchy } from '@/components/kraje/kraje-helper';

type Props = {
  allLokality: Lokalita[];
  initialData?: Lokalita | null;
};

export function useLokalitaHierarchy({ allLokality, initialData }: Props) {
  const [type, setType] = useState<LokalitaUroven>(
    initialData?.uroven ?? 'SVET',
  );
  const hierarchy = getHierarchy(allLokality, initialData);

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
    () => allLokality.filter((l) => l.uroven === 'SVET'),
    [allLokality],
  );

  // KRALOVSTVI
  const kralovstvi = useMemo(
    () =>
      allLokality.filter(
        (l) => l.uroven === 'KRALOVSTVI' && l.parentId === selectedSvet,
      ),
    [allLokality, selectedSvet],
  );

  // KRAJE
  const kraje = useMemo(
    () =>
      allLokality.filter(
        (l) => l.uroven === 'KRAJ' && l.parentId === selectedKralovstvi,
      ),
    [allLokality, selectedKralovstvi],
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
