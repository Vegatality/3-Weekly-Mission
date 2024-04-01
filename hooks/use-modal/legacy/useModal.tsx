'use client';

import { useState } from 'react';

import {
  ExposedModalPropsWithoutModalRef,
  ModalComponent,
  ModalComponentHasAllRequiredProps,
  ModalComponentSuperSet,
  OpenModalOptions,
  OptionalModalProps,
} from '@hooks/use-modal/types';
import { useToggleModal } from '@hooks/use-modal/useToggleModal';

type DirectModalComponentProps = OptionalModalProps;

/**
 * @deprecated use context useModal hook instead
 * - this hook can be used to open and close modal without context api
 * - but it is not recommended to use this hook
 * - because this is a hook bound to a local component(local state), so it's unlikely to be used frequently.
 */
const useModal = <CustomModalProps = unknown,>() => {
  const [Modal, setModal] = useState<ModalComponent>();
  const [ModalProps, setModalInfo] = useState<ExposedModalPropsWithoutModalRef<ModalComponent<CustomModalProps>>>();
  const [openModalOptions, setOpenModalOptions] = useState<OpenModalOptions>({ persist: false });
  const { isModalOpen, toggleModal, modalRef } = useToggleModal(false, openModalOptions);

  const closeModal = () => {
    if (isModalOpen) {
      toggleModal();

      if (ModalProps && typeof ModalProps.onClose === 'function') {
        ModalProps.onClose();
      }
    }
  };

  const submitModal = (e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault?.();
      e.persist?.();
    }

    if (isModalOpen) {
      toggleModal();

      if (ModalProps && typeof ModalProps.onSubmit === 'function') {
        ModalProps.onSubmit();
      }
    }
  };

  const openModal = <VMC extends ModalComponentSuperSet>({
    ModalComponent,
    props,
    options,
  }: {
    ModalComponent: ModalComponentHasAllRequiredProps<VMC>;
    props?: ExposedModalPropsWithoutModalRef<VMC>;
    options?: OpenModalOptions;
  }) => {
    if (!isModalOpen) {
      toggleModal();
      setModalInfo(props);
      setModal(() => ModalComponent);
      setOpenModalOptions(options || { persist: false });
    }
  };

  const ModalComponent = (directProps?: DirectModalComponentProps) => {
    if (!Modal) throw new Error('ModalComponent property should be passed to openModal function');

    return (
      <Modal
        modalRef={modalRef}
        closeModal={closeModal}
        submitModal={submitModal}
        isCurrentModalOpen={isModalOpen}
        {...ModalProps}
        {...directProps}
      />
    );
  };

  return { isModalOpen, ModalProps, openModal, closeModal, ModalComponent };
};

export { useModal };
