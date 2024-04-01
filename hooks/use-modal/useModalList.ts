'use client';

import { useModalListDispatch } from './context/ModalListContext';
import { CloseWithModalKey, OpenModalListWithModalKey, UseModalList } from './types';

export const useModalList: UseModalList = () => {
  const { closeWithModalKeyImpl, openWithModalKeyImpl, watch } = useModalListDispatch();

  const openModalList: OpenModalListWithModalKey = ({ modalKey, ModalComponent, props, options }) => {
    openWithModalKeyImpl({ modalKey, ModalComponent, props, options });
  };

  const closeModalList: CloseWithModalKey = ({ modalKey }) => {
    closeWithModalKeyImpl({ modalKey });
  };

  return { openModalList, closeModalList, watch };
};
// Path: hooks/use-modal/useModalList.ts
