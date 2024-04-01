'use client';

import { createContext, useContext } from 'react';

import { TModalDispatchContext, TModalStateContext } from '../types';

export const ModalStateContext = createContext<TModalStateContext>({
  ModalComponent: null,
  props: {
    modalRef: null,
  },
  isModalOpen: false,
});

export const ModalDispatchContext = createContext<TModalDispatchContext | undefined>(undefined);

export const useModalDispatch = () => {
  const dispatcher = useContext(ModalDispatchContext);

  if (dispatcher === undefined) throw new Error('useModalDispatch should be within ModalProvider');

  return dispatcher;
};

export const useModalState = () => {
  const state = useContext(ModalStateContext);

  if (state.ModalComponent === null) {
    throw new Error('useModalState should receive ModalComponent in the openModal function in order to be used.');
  }

  return state;
};
