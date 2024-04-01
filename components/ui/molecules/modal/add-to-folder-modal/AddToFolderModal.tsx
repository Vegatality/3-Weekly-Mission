import { useState } from 'react';

import styled from 'styled-components';

import { ModalComponentForList } from '@hooks/use-modal/types';

import Modal from '..';
import { StModalSubText } from '../StModalSubText';
import { useCreateLink } from './useCreateLink.mutation';

interface FolderNameAndLinkCount {
  folderName: string;
  linkCount: number;
  id: number;
}
interface AddToFolderModalProps {
  modalName?: string;
  linkUrl: string;
  folderId?: number;
  folderList: FolderNameAndLinkCount[];
}

const IMG_URL = '/images/folder/folder-icon-check.svg';

/**
 * @description 폴더에 추가 모달
 */
const AddToFolderModal: ModalComponentForList<AddToFolderModalProps> = ({
  modalName = '폴더에 추가',
  linkUrl,
  folderId: currentFolderId,
  folderList,
  closeModal,
  modalRef,
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>(currentFolderId);
  const { mutate } = useCreateLink();

  const createLink = ({ folderId, url }: { folderId: number | undefined; url: string }) => {
    if (folderId === undefined) {
      return;
    }

    // TODO: url 형식 안 맞으면 return;
    mutate(
      { folderId, url },
      {
        onSuccess: closeModal,
      },
    );
  };

  const onSelectHandler = (folderId: number) => {
    setSelectedFolderId(folderId);
  };

  return (
    <Modal.StModalDim>
      <Modal.StModalWrapper ref={modalRef} $rowGap={2.4}>
        <Modal.StModalLabel as='div' $rowGap={0.8}>
          {modalName}
          <StModalSubText>{linkUrl}</StModalSubText>
        </Modal.StModalLabel>
        <StAddFolderListUl>
          {folderList.map(({ folderName, linkCount, id }) => {
            const isSelected = id === selectedFolderId;

            return (
              <StAddFolderList key={id} $isSelected={isSelected} onClick={() => onSelectHandler(id)}>
                <StAddFolderListTextBox>
                  {folderName}
                  <StAddFolderListLinkCount>{linkCount}개 링크</StAddFolderListLinkCount>
                </StAddFolderListTextBox>
                {isSelected && <StFolderCheckImg alt='폴더 체크 상태 이미지' src={IMG_URL} />}
              </StAddFolderList>
            );
          })}
        </StAddFolderListUl>
        <Modal.ModalCloseBtn closeModal={closeModal} />
        <Modal.StModalActionBtn onClick={() => createLink({ folderId: selectedFolderId, url: linkUrl })} type='button'>
          추가하기
        </Modal.StModalActionBtn>
      </Modal.StModalWrapper>
    </Modal.StModalDim>
  );
};

export default AddToFolderModal;

const StAddFolderListUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;

  max-height: 17.2rem;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(57 158 238 / 80%); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: rgb(36 204 216 / 49%); /*스크롤바 뒷 배경 색상*/
    border-radius: 10px;
  }
`;

const StAddFolderList = styled.li<{ $isSelected?: boolean }>`
  cursor: pointer;

  padding: 0.8rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${({ $isSelected }) =>
    $isSelected ? 'var(--Linkbrary-primary-color, #6D6AFE)' : 'var(--Linkbrary-gray100, #373740)'};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem; /* 150% */

  border-radius: 0.8rem;
  background-color: ${({ $isSelected }) => $isSelected && 'var(--Linkbrary-bg, #f0f6ff)'};

  &:hover {
    background-color: ${({ theme }) => theme.bg};
  }
`;

const StAddFolderListLinkCount = styled.span`
  color: var(--Linkbrary-gray60, #9fa6b2);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: normal;
`;

const StAddFolderListTextBox = styled.div`
  display: flex;
  column-gap: 0.8rem;

  align-items: center;
`;

const StFolderCheckImg = styled.img`
  width: 1.4rem;
  height: 1.4rem;
`;
