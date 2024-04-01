import { useQuery } from '@tanstack/react-query';

import { linkQuery } from '@queries/link';

type UseGetSortedFolderLinksDataParam = number;

export const useGetSortedFolderLinksData = (folderId: UseGetSortedFolderLinksDataParam) => {
  return useQuery({ ...linkQuery.folderLinks(folderId) });
};
