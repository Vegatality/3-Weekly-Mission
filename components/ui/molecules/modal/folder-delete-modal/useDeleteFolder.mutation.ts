import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFolder } from '@apis/folder';
import { folderQueryKeys } from '@queries/folder';

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderQueryKeys.masterKey() });
    },
  });
};
