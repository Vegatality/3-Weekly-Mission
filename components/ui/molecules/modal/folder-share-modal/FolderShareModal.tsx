import { useEffect, useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import { ModalComponentPropsForList } from '@hooks/use-modal/types';
import { useSNSShare } from '@hooks/useSNSShare';
import { getUserId } from '@utils/session-storage/getUserId';

import Modal from '..';
import { StModalSubText } from '../StModalSubText';

interface FolderShareModalProps {
  modalName?: string;
  folderName: string;
  folderId: number;
}

interface SNSShareOption {
  iconName: string;
  text: string;
  onClickHandler: () => void;
}
/**
 * @description 폴더 공유 모달
 */
const FolderShareModal = ({
  modalName = '폴더 공유',
  folderName,
  closeModal,
  modalRef,
  folderId,
}: ModalComponentPropsForList<FolderShareModalProps>) => {
  const [origin, setOriginAfterMount] = useState('');

  // /shared?user=1&folder=307
  // 지금 위치한 곳은 /folder인데 {호스트 주소}/shared?user={현재 로그인 중인 유저 ID}&folder={현재 열려있는 폴더 ID}
  useEffect(() => {
    setOriginAfterMount(window.location.origin);
  }, []);

  const userId = getUserId();

  const { shareToFacebook, shareToKakaotalk, copyFolderUrl } = useSNSShare({
    title: 'Linkbrary',
    origin,
    userId,
    folderId,
  });

  const snsShareOptionsArray: SNSShareOption[] = [
    { iconName: 'kakao', text: '카카오톡', onClickHandler: shareToKakaotalk },
    { iconName: 'facebook', text: '페이스북', onClickHandler: shareToFacebook },
    { iconName: 'clipboard', text: '링크 복사', onClickHandler: copyFolderUrl },
  ];

  return (
    <Modal.StModalDim>
      <Modal.StModalWrapper ref={modalRef} $rowGap={2.4}>
        <Modal.StModalLabel as='div' $rowGap={0.8}>
          {modalName}
          <StModalSubText>{folderName}</StModalSubText>
        </Modal.StModalLabel>
        <StSNSListWrapper>
          {snsShareOptionsArray.map(({ iconName, text, onClickHandler }) => {
            return (
              <StSNSBox key={text} onClick={onClickHandler}>
                <Image
                  width={42}
                  height={42}
                  alt={`${text} 아이콘`}
                  src={`/images/folder/modal-${iconName}-icon.svg`}
                />
                <span>{text}</span>
              </StSNSBox>
            );
          })}
        </StSNSListWrapper>
        <Modal.ModalCloseBtn closeModal={closeModal} />
      </Modal.StModalWrapper>
    </Modal.StModalDim>
  );
};

export default FolderShareModal;

const StSNSListWrapper = styled.div`
  display: flex;
  column-gap: 3.2rem;
`;

const StSNSBox = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 1rem;

  color: var(--Linkbrary-gray80, #444);
  text-align: center;
  font-family: Inter;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.5rem; /* 115.385% */

  & > img {
    width: 4.2rem;
    height: 4.2rem;
  }
`;
