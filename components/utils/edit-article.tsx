'use client';

import ButtonPage from '@/components/utils/button-page';
import { IconEdit, IconDelete } from '@/components/utils/svgs/icons';

type Props = {
  handleEdit: () => void;
  handleDelete: () => void;
};

const EditArticle = ({ handleEdit, handleDelete }: Props) => {
  return (
    <div className="absolute bottom-0 right-0 flex gap-1">
      <ButtonPage
        type="button"
        onClick={() => {
          handleEdit();
        }}
      >
        <IconEdit />
      </ButtonPage>
      <ButtonPage
        type="button"
        onClick={() => {
          handleDelete();
        }}
      >
        <IconDelete className="text-red" />
      </ButtonPage>
    </div>
  );
};
export default EditArticle;
