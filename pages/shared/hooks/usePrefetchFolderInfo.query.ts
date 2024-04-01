import { getQueryClient } from '@lib/getQueryClient';
import { folderQuery } from '@queries/folder';

export const usePrefetchFolderInfo = async (folderId: number) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({ ...folderQuery.folderInfo(folderId) });
};
