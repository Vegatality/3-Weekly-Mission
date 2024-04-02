import { getFolderInfo } from '@apis/folder/getFolderInfo';
import { getFolderList } from '@apis/folder/getFolderList';

export const folderQueryKeys = {
  masterKey: () => ['folder'],
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
