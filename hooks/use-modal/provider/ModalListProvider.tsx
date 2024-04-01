'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import { ModalListDispatchContext, ModalListStateContext } from '../context/ModalListContext';
import {
  CloseWithModalKeyImpl,
  CustomModalRef,
  ModalInfoManageMap,
  ModalKey,
  ModalListProviderProps,
  OpenedModalStateWithModalKey,
  OpenWithModalKeyImpl,
  SetCustomModalRef,
  Watch,
} from '../types';
import { useCloseModalOnMouseDown } from '../useCloseModalOnMouseDown';
import { usePersistScrollingDim } from '../usePersistScrollingDim';

const ModalListProvider = ({ children }: ModalListProviderProps) => {
  const [opendModalList, setOpenedModalList] = useState<OpenedModalStateWithModalKey[]>([]);
  const modalInfoManageMapRef = useRef<ModalInfoManageMap>(new Map());

  const watch: Watch = (modalKey: ModalKey) => {
    return modalInfoManageMapRef.current.get(JSON.stringify(modalKey));
  };

  const setCustomModalRef: SetCustomModalRef = useCallback(({ modalKey, ModalComponent, options }) => {
    const customModalRef = <T extends HTMLElement | null>(node: T) => {
      if (node) {
        modalInfoManageMapRef.current.set(modalKey, { ModalComponent, options, modalNode: node });
      }
    };

    return customModalRef as CustomModalRef;
  }, []);

  const openWithModalKeyImpl: OpenWithModalKeyImpl = ({ modalKey, ModalComponent, props, options }) => {
    const stringifiedModalKey = JSON.stringify(modalKey);
    const modalInfo = { modalKey: stringifiedModalKey, ModalComponent };
    const modalRef: CustomModalRef = setCustomModalRef({ ModalComponent, modalKey: stringifiedModalKey, options });
    Object.defineProperty(modalRef, 'current', {
      configurable: false,
      enumerable: false,
      get: () => watch(modalKey),
      /**
       * TODO: getter/setter 타입 정의 지원하면 주석 해제. 아니면 class로 변경
       * {@link CustomModalRef} 지원하면 타입 수정
       * @see https://github.com/microsoft/TypeScript/issues/2521
       * @see https://github.com/microsoft/TypeScript/issues/43662
       */
      // set: <T extends HTMLElement | null>(node: T) => {
      //   const customModalRef: CustomModalRef = setCustomModalRef({
      //     ModalComponent,
      //     modalKey: stringifiedModalKey,
      //     options,
      //   });
      //   customModalRef(node);
      // },
    });
    setOpenedModalList((prev) => {
      if (props) {
        return [
          ...prev,
          {
            ...modalInfo,
            props: { ...props, modalRef },
          },
        ];
      }

      return [
        ...prev,
        {
          ...modalInfo,
          props: { modalRef },
        },
      ];
    });
  };

  const closeWithModalKeyImpl: CloseWithModalKeyImpl = ({ modalKey }) => {
    const stringifiedModalKey = typeof modalKey === 'string' ? modalKey : JSON.stringify(modalKey);
    setOpenedModalList((prev) => {
      return prev.filter((modal) => modal.modalKey !== stringifiedModalKey);
    });
    const removeResult = modalInfoManageMapRef.current.delete(stringifiedModalKey);

    if (!removeResult) {
      console.error(`Failed to remove modal with key: ${stringifiedModalKey}`);
    }
  };

  useCloseModalOnMouseDown({ modalInfoManageMap: modalInfoManageMapRef.current, closeWithModalKeyImpl });
  usePersistScrollingDim({ modalInfoManageMap: modalInfoManageMapRef.current, dependencyList: [opendModalList] });

  const dispatch = useMemo(() => ({ openWithModalKeyImpl, closeWithModalKeyImpl, watch }), []);

  return (
    <ModalListDispatchContext.Provider value={dispatch}>
      <ModalListStateContext.Provider value={opendModalList}>{children}</ModalListStateContext.Provider>
    </ModalListDispatchContext.Provider>
  );
};

export default ModalListProvider;
