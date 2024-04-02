import { useQuery } from '@tanstack/react-query';

import { FolderType } from '@apis/folder';
import { folderQuery } from '@queries/folder';

export interface FolderCategoryDataWithIdTotal extends Partial<Omit<FolderType.FolderCategoryData, 'id' | 'name'>> {
  id: number | 'total';
  name: string;
}

export const useGetFolderCategoryList = () => {
  return useQuery({
    ...folderQuery.masterQuery(),
    select: (response) => {
      const folderCategoryDataWithIdTotal: FolderCategoryDataWithIdTotal[] = [];

      if (response.length) {
        folderCategoryDataWithIdTotal.unshift({ name: '전체', id: 'total' });
      }

      return [...folderCategoryDataWithIdTotal, ...response];
    },
  });
};
