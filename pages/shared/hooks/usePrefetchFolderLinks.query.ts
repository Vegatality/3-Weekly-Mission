import { getQueryClient } from '@lib/getQueryClient';
import { linkQuery } from '@queries/link';

/**
 * 선택한 폴더 링크들 프리패치
 */
export const usePrefetchFolderLinks = async (folderId: number) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({ ...linkQuery.folderLinks(folderId) });
};
