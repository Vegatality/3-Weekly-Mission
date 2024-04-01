import { ModalComponentPropsForList } from '@hooks/use-modal/types';

import Modal from '..';
import { StModalSubText } from '../StModalSubText';
import { useDeleteLink } from './useDeleteLink.mutation';

type TLinkDeleteModalProps = {
  modalName?: string;
  linkUrl: string;
  linkId: number;
};

const LinkDeleteModal = ({
  modalName = '링크 삭제',
  linkUrl,
  closeModal,
  linkId,
  modalRef,
}: ModalComponentPropsForList<TLinkDeleteModalProps>) => {
  const { mutate } = useDeleteLink();

  const deleteLink = (linkId: number) => {
    mutate(linkId, {
      onSuccess: closeModal,
    });
  };

  return (
    <Modal.StModalDim>
      <Modal.StModalWrapper ref={modalRef} $rowGap={2.4}>
        <Modal.StModalLabel as='div' $rowGap={0.8}>
          {modalName}
          <StModalSubText>{linkUrl}</StModalSubText>
        </Modal.StModalLabel>
        <Modal.ModalCloseBtn closeModal={closeModal} />
        <Modal.StModalActionBtn onClick={() => deleteLink(linkId)} type='button' $originalColor='red'>
          삭제하기
        </Modal.StModalActionBtn>
      </Modal.StModalWrapper>
    </Modal.StModalDim>
  );
};

export default LinkDeleteModal;
