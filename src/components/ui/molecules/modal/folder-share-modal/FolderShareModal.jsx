import { useEffect } from 'react';

import styled from 'styled-components';

import ModalCloseBtn from '@components/ui/atoms/button/modal-btn/ModalCloseBtn';
import { StModalLabel } from '@components/ui/atoms/label/modal-label/StModalLabel';

import { StModalBackground } from '../StModalBackground';
import { StModalSubText } from '../StModalSubText';
import { StModalWrapper } from '../StModalWrapper';

const FolderShareModal = ({ modalText, linkUrl }) => {
  const copyFolderUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log('Content copied to clipboard');
    } catch (e) {
      console.error('Failed to copy');
    }
  };

  // ① encodeURI(): 인터넷 주소에서 사용하는 :, ;, /, =, ?, & 등을 제외하고 인코딩하는 함수
  // ② encodeURIComponent(): 모든 문자를 인코딩하는 함수, 전체 URI를 구성하는 부분 인코딩에 적합, 매개변수를 인코딩 하려는 경우
  // ③ 인코딩: 데이터를 다른 포맷(형식)으로 변환. 사용할 수 없는 문자를 사용할 수 있는 특수 문자 조합으로 표현

  /**
   * @see {@link https://become-a-developer.tistory.com/63} - Parameter 'href' should represent a valid URL 에러 뜰 시.  URL을 읽어들일 수 없음 에러 뜰 시
   */
  const shareToFacebook = () => {
    const sharedLink = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
  };

  const mockArray = [
    { iconName: 'kakao', text: '카카오톡', onClickHandler: () => {} },
    { iconName: 'facebook', text: '페이스북', onClickHandler: shareToFacebook },
    { iconName: 'clipboard', text: '링크 복사', onClickHandler: copyFolderUrl },
  ];

  // ✅ clipboard.js 라이브러리
  useEffect(() => {
    // navigator.permissions.query({ name: 'write-on-clipboard' }).then((result) => {
    // chrome용
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      // eslint-disable-next-line eqeqeq
      if (result.state == 'granted' || result.state == 'prompt') {
        // eslint-disable-next-line no-alert
        console.log('Write access granted!');
      }
    });
  }, []);

  return (
    <StModalBackground>
      <StModalWrapper $rowGap={2.4}>
        <StModalLabel as='div' $rowGap={0.8}>
          {modalText}
          <StModalSubText>{linkUrl}</StModalSubText>
        </StModalLabel>
        <StSNSListWrapper>
          {mockArray.map(({ iconName, text, onClickHandler }) => {
            return (
              <StSNSBox key={text} onClick={onClickHandler}>
                <img alt={`${text} 아이콘`} src={`/images/modal-${iconName}-icon.svg`} />
                <span>{text}</span>
              </StSNSBox>
            );
          })}
        </StSNSListWrapper>
        <ModalCloseBtn />
      </StModalWrapper>
    </StModalBackground>
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
