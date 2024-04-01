'use client';

import { DependencyList, useEffect } from 'react';

import { ModalInfoManageMap } from './types';

interface UsePersistScrollingDimParam {
  modalInfoManageMap: ModalInfoManageMap;
  dependencyList?: DependencyList;
}

/**
 * @see https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
 */
export const usePersistScrollingDim = ({ modalInfoManageMap, dependencyList = [] }: UsePersistScrollingDimParam) => {
  useEffect(() => {
    if (modalInfoManageMap.size === 0) {
      return;
    }

    document.body.style.top = `-${window.scrollY}px`;
    const scrollY = document.documentElement.scrollTop;
    document.body.style.position = 'fixed';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, dependencyList);
};
