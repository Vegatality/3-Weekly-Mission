import { forwardRef } from 'react';

import styled from 'styled-components';

import { mediaBreakpoint } from '@style/media-breakpoint/mediaBreakpoint';
import { zIndex } from '@style/z-index/zIndex';

import AddLinkBar from '@components/ui/molecules/bar/add-link-bar/AddLinkBar';
import { AddToFolderModal } from '@components/ui/molecules/modal/add-to-folder-modal';
import { useFolderNameAndLinkCount } from '@pages/folder/hooks/useFolderNameAndLinkCount.query';

import { useModalList } from '@hooks/use-modal';
import { useInput } from '@hooks/useInput';

import styles from './AddLink.module.css';

type AddLinkProps = {
  shouldAddLinkLocateBottom?: boolean;
};
const AddLink = forwardRef<HTMLElement | null, AddLinkProps>(({ shouldAddLinkLocateBottom }, ref) => {
  const [input, onChange, clearInput] = useInput('');
  const { openModalList } = useModalList();
  const { data, status } = useFolderNameAndLinkCount();

  const openAddToFolderModal = () => {
    if (status === 'success') {
      openModalList({
        modalKey: ['addToFolderModal'],
        ModalComponent: AddToFolderModal,
        props: { linkUrl: input, onClose: clearInput, folderList: data },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      openAddToFolderModal();
    }
  };

  return (
    <>
      <section ref={ref} className={styles['add-link-area']}>
        <AddLinkBar
          openAddToFolderModal={openAddToFolderModal}
          input={input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      </section>
      {shouldAddLinkLocateBottom && (
        <StAddLinkBottomArea>
          <AddLinkBar
            openAddToFolderModal={openAddToFolderModal}
            input={input}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
        </StAddLinkBottomArea>
      )}
    </>
  );
});

AddLink.displayName = 'AddLink';

export default AddLink;

const StAddLinkBottomArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem 3.3rem 1.6rem 3.2rem;

  width: 100%;

  position: fixed;
  bottom: 0;
  z-index: ${zIndex.floatingElement};

  background: ${({ theme }) => theme.bg};
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.16);

  @media ${mediaBreakpoint.tablet} {
    padding-block: 2.4rem;
    padding-inline: 0;
  }
`;
