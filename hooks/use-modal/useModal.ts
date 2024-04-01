'use client';

import { useModalDispatch, useModalState } from './context/ModalContext';
import { OpenModal, UseModal } from './types';

/**
 *
 * @example
 * ```ts
 * const { openModal, closeModal } = useModal();
 * const handleModal = () => {
 *   openModal(MyCustomModal, { linkUrl: input, onClose: clearInput });
 * };
 * ```
 */
export const useModal: UseModal = () => {
  const { close, open } = useModalDispatch();
  const { isModalOpen } = useModalState();

  const openModal: OpenModal = ({ Component, props, options }) => {
    open({
      ModalComponent: Component,
      props,
      options,
    });
  };

  const closeModal = () => {
    close();
  };

  return { openModal, closeModal, isModalOpen };
};
