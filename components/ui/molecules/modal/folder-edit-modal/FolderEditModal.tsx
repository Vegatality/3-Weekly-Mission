import { ModalComponentForList } from '@hooks/use-modal/types';
import { useFormOnSubmit } from '@hooks/useFormOnSubmit';

import Modal from '..';
import { useEditFolderName } from './useEditFolderName.mutation';

interface FolderName {
  folderName: string;
}

type FolderEditModalProps = {
  modalName?: string;
  folderName: string;
  folderId: number;
};
/**
 * @description 폴더 이름 변경 모달
 * todo: 폴더명 state 받아서 변경
 */
const FolderEditModal: ModalComponentForList<FolderEditModalProps> = ({
  modalName = '폴더 이름 변경',
  folderName,
  folderId,
  closeModal,
  modalRef,
}) => {
  const { mutate } = useEditFolderName();

  const { register, handleSubmit } = useFormOnSubmit<FolderName>({
    mode: 'onBlur',
    defaultValues: {
      folderName: '',
    },
    onSubmit: ({ folderName }) => {
      mutate(
        { folderId, name: folderName },
        {
          onSuccess: closeModal,
        },
      );
    },
  });

  return (
    <Modal.StModalDim>
      <Modal.StModalWrapper onSubmit={handleSubmit} ref={modalRef} $rowGap={1.5}>
        <Modal.StModalLabel htmlFor='folder-name-change' $rowGap={2.4}>
          {/* 접근성 - 시각 장애인 분들 위함 ---> input은 무조건 라벨 태그 안에 있어야 한다고 권장함. - W3C */}
          {modalName}
          <Modal.StModalInput
            autoFocus
            {...register('folderName', {
              required: '내용을 입력해주세요.',
              maxLength: {
                value: 30,
                message: '30자 이내로 입력해주세요.',
              },
            })}
            placeholder={folderName}
            id='folder-name-change'
          />
        </Modal.StModalLabel>
        <Modal.ModalCloseBtn closeModal={closeModal} />
        <Modal.StModalActionBtn>변경하기</Modal.StModalActionBtn>
      </Modal.StModalWrapper>
    </Modal.StModalDim>
  );
};

export default FolderEditModal;
