'use client';

import { deleteAction } from '@/lib/clanek-actions';
import { ClanekKategorie } from '@prisma/client';

import ModalWrapper from '@/components/utils/modal-wrapper';

type Props = {
  id: string;
  slovoKategorie: string;
  onClose: () => void;
};

const ClanekDelete = ({ id, slovoKategorie, onClose }: Props) => {
  return (
    <ModalWrapper>
      <div className="bg-white relative p-4 rounded-lg">
        <p>Opravdu chcete smazat {slovoKategorie}?</p>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={id} />

          <div className="flex justify-center gap-2 mt-4">
            <button type="submit" className="text-red-500 cursor-pointer">
              Smazat
            </button>

            <button type="button" onClick={onClose} className="cursor-pointer">
              Zrušit
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};
export default ClanekDelete;
