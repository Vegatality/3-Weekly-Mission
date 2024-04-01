import { useQuery } from '@tanstack/react-query';

import { folderQuery } from '@queries/folder';

/**
 * ReadOnly observer query for folder name and link count
 */
export const useFolderNameAndLinkCount = () => {
  return useQuery({
    ...folderQuery.masterQuery(),
    enabled: false,
    select: (data) => {
      return data.map(({ link_count, name, id }) => ({
        folderName: name,
        linkCount: link_count,
        id,
      }));
    },
  });
};
