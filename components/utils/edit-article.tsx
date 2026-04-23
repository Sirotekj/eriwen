'use client';

import ButtonPage from '@/components/utils/button-page';
import HoverWrapper from '@/components/utils/hover-wrapper';
import { IconEdit, IconDelete } from '@/components/utils/svgs/icons';

type Props = {
  handleEdit: () => void;
  handleDelete: () => void;
};

const EditArticle = ({ handleEdit, handleDelete }: Props) => {
  return (
    <div className="absolute bottom-0 right-0 flex gap-1">
      <HoverWrapper tooltip="Upravit">
        <ButtonPage
          type="button"
          onClick={() => {
            handleEdit();
          }}
        >
          <IconEdit />
        </ButtonPage>
      </HoverWrapper>
      <HoverWrapper tooltip="Smazat">
        <ButtonPage
          type="button"
          onClick={() => {
            handleDelete();
          }}
        >
          <IconDelete className="text-red" />
        </ButtonPage>
      </HoverWrapper>
    </div>
  );
};
export default EditArticle;
