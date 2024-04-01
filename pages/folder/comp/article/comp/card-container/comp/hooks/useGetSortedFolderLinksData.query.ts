import { useQuery } from '@tanstack/react-query';

import { linkQuery } from '@queries/link';

type UseGetSortedFolderLinksDataParam = 'total' | number;

export const useGetSortedFolderLinksData = (folderId: UseGetSortedFolderLinksDataParam) => {
  return useQuery({
    ...linkQuery.folderLinks(folderId as number),
    enabled: folderId !== 'total' && typeof folderId === 'number',
  });
};
