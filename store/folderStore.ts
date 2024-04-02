import { FolderType } from '@apis/folder';

import { createWithEqualityFn } from './custom/traditional';
import { shallow } from './custom/vanilla/shallow';

type FolderSlice = {
  folderCategoryList: FolderType.FolderCategoryData[];
  userId: number | null;
  targetLink: number | null;
  currentFolderId: number | null;
  setUserId: (userId: number) => void;
  setFolderCategoryList: (categories: FolderType.FolderCategoryData[]) => void;
  setTargetLink: (targetLink: number) => void;
  setCurrentFolderId: (folderId: number) => void;
};

export const useFolderStore = createWithEqualityFn<FolderSlice>()(
  (set) => ({
    userId: null,
    currentFolderId: null,
    folderCategoryList: [],
    targetLink: null,
    setUserId: (userId) => set({ userId }),
    setFolderCategoryList: (categories) => set({ folderCategoryList: categories }),
    setCurrentFolderId: (folderId: number) => set({ currentFolderId: folderId }),
    setTargetLink: (targetLink: number) => set({ targetLink }),
  }),
  shallow,
);
