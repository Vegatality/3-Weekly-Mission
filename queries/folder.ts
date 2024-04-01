import { getFolderInfo } from '@api/folder/getFolderInfo';
import { getFolderList } from '@api/folder/getFolderList';

export const folderQueryKeys = {
  masterKey: () => ['folder-list'],
  folderInfo: (folderId: number) => [...folderQueryKeys.masterKey(), folderId],
};

export const folderQuery = {
  masterQuery: () => ({
    queryKey: folderQueryKeys.masterKey(),
    queryFn: getFolderList,
  }),
  folderInfo: (folderId: number) => ({
    queryKey: folderQueryKeys.folderInfo(folderId),
    queryFn: () => getFolderInfo(folderId),
  }),
};
