import { ModalComponentForList } from '@hooks/use-modal/types';

import Modal from '..';
import { useDeleteFolder } from './useDeleteFolder.mutation';

type FolderDeleteModalProps = {
  modalName?: string;
  folderName: string;
  folderId: number;
};
/**
 * @description '폴더 삭제' 혹은 '링크 삭제'용 모달
 * 스타일 동일
 * todo: prop 받는 거 linkUrl 혹은 folderName으로 할 거.
 */
const FolderDeleteModal: ModalComponentForList<FolderDeleteModalProps> = ({
  modalName = '폴더 삭제',
  folderName,
  folderId,
  closeModal,
  modalRef,
}) => {
  const { mutate } = useDeleteFolder();

  const deleteFolder = (folderId: number) => {
    mutate(folderId, {
      onSuccess: closeModal,
    });
  };

  return (
    <Modal.StModalDim>
      <Modal.StModalWrapper ref={modalRef} $rowGap={2.4}>
        <Modal.StModalLabel as='div' $rowGap={0.8}>
          {modalName}
          <Modal.StModalSubText>{folderName}</Modal.StModalSubText>
        </Modal.StModalLabel>
        <Modal.ModalCloseBtn closeModal={closeModal} />
        <Modal.StModalActionBtn onClick={() => deleteFolder(folderId)} type='button' $originalColor='red'>
          삭제하기
        </Modal.StModalActionBtn>
      </Modal.StModalWrapper>
    </Modal.StModalDim>
  );
};

export default FolderDeleteModal;
