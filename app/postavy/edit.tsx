'use client';

import { deleteAction } from '@/lib/actions-postava';
import ButtonPage from '@/components/utils/button-page';
import { IconDelete } from '@/components/utils/svgs/icons';

export default function EditPostavy({ id }: { id: string }) {
  return (
    <ButtonPage type="button" onClick={() => deleteAction(id)}>
      <IconDelete className="text-red" />
    </ButtonPage>
  );
}
