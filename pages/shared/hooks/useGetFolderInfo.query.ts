import { useQuery } from '@tanstack/react-query';

import { folderQuery } from '@queries/folder';

export const useGetFolderInfo = (folderId: number) => {
  return useQuery({ ...folderQuery.folderInfo(folderId) });
};
