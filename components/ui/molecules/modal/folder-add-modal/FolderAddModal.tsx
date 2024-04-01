import { ModalComponentForList } from '@hooks/use-modal/types';
import { useFormOnSubmit } from '@hooks/useFormOnSubmit';

import Modal from '..';
import { useCreateNewFolder } from './useCreateNewFolder.mutation';

interface FolderName {
  folderName: string;
}

/**
 * @description 폴더 추가 모달
 */
type FolderAddModalProps = {
  modalName?: string;
};

const FolderAddModal: ModalComponentForList<FolderAddModalProps> = ({
  modalName = '폴더 추가',
  closeModal,
  modalRef,
}) => {
  const { mutate } = useCreateNewFolder();

  const { register, handleSubmit } = useFormOnSubmit<FolderName>({
    defaultValues: {
      folderName: '',
    },
    mode: 'onBlur',
    onSubmit: ({ folderName }) => {
      mutate(folderName, {
        onSuccess: closeModal,
      });
    },
  });

  return (
    <Modal.StModalDim>
      <Modal.StModalWrapper onSubmit={handleSubmit} ref={modalRef}>
        <Modal.StModalLabel htmlFor='folder-add'>
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
            placeholder='내용 입력'
            id='folder-add'
          />
        </Modal.StModalLabel>
        <Modal.ModalCloseBtn closeModal={closeModal} />
        <Modal.StModalActionBtn>추가하기</Modal.StModalActionBtn>
      </Modal.StModalWrapper>
    </Modal.StModalDim>
  );
};

export default FolderAddModal;
