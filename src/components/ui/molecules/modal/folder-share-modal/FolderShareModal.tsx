import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSNSShare } from '@hooks/useSNSShare';

import Modal from '..';
import { StModalSubText } from '../StModalSubText';

import { useFolderStore } from '@/store/folderStore';

type TFolderShareModalProps = {
  modalName?: string;
  folderName?: string;
  closeModal?: () => void;
};
/**
 * @description 폴더 공유 모달
 */
const FolderShareModal = ({ modalName = '폴더 공유', folderName, closeModal }: TFolderShareModalProps) => {
  const [origin, setOriginAfterMount] = useState('');
  // const [url, setUrlAfterMount] = useState('');

  // 지금 위치한 곳은 /folder인데 {호스트 주소}/shared?user={현재 로그인 중인 유저 ID}&folder={현재 열려있는 폴더 ID}
  useEffect(() => {
    setOriginAfterMount(window.location.origin);
  }, []);

  // TODO: useFolderStore에 state 담는 작업은 아직 안했음.
  const { userId, folderId } = useFolderStore((state) => ({ userId: state.userId, folderId: state.currentFolderId }));

  const { shareToFacebook, shareToKakaotalk, copyFolderUrl } = useSNSShare({
    title: 'Linkbrary',
    origin,
    userId,
    folderId,
  });

  const snsShareOptionsArray = [
    { iconName: 'kakao', text: '카카오톡', onClickHandler: shareToKakaotalk },
    { iconName: 'facebook', text: '페이스북', onClickHandler: shareToFacebook },
    { iconName: 'clipboard', text: '링크 복사', onClickHandler: copyFolderUrl },
  ];

  return (
    <Modal.StModalBackground>
      <Modal.StModalWrapper $rowGap={2.4}>
        <Modal.StModalLabel as='div' $rowGap={0.8}>
          {modalName}
          <StModalSubText>{folderName}</StModalSubText>
        </Modal.StModalLabel>
        <StSNSListWrapper>
          {snsShareOptionsArray.map(({ iconName, text, onClickHandler }) => {
            return (
              <StSNSBox key={text} onClick={onClickHandler}>
                <img alt={`${text} 아이콘`} src={`/images/folder/modal-${iconName}-icon.svg`} />
                <span>{text}</span>
              </StSNSBox>
            );
          })}
        </StSNSListWrapper>
        <Modal.ModalCloseBtn closeModal={closeModal} />
      </Modal.StModalWrapper>
    </Modal.StModalBackground>
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
