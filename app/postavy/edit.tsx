'use client';

import { deleteAction } from '@/lib/postavy-actions';
import ButtonPage from '@/components/utils/button-page';
import { IconDelete } from '@/components/utils/svgs/icons';

export default function EditPostavy({ id }: { id: string }) {
  return (
    <ButtonPage
      className="absolut right-0 bottom-0"
      type="button"
      onClick={() => deleteAction(id)}
    >
      <IconDelete className="text-red" />
    </ButtonPage>
  );
}
