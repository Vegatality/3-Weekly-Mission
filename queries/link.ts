import { getSortedFolderLinksData } from '@api/link/getSortedFolderLinksData';
import { getTotalLinks } from '@api/link/getTotalLinks';

export const linkQueryKeys = {
  masterKey: () => ['links'],
  folderLinks: (folderId: number) => [...linkQueryKeys.masterKey(), folderId],
};

export const linkQuery = {
  masterQuery: () => ({
    queryKey: linkQueryKeys.masterKey(),
    queryFn: getTotalLinks,
  }),
  folderLinks: (folderId: number) => ({
    queryKey: linkQueryKeys.folderLinks(folderId),
    queryFn: () => getSortedFolderLinksData(folderId),
  }),
};
