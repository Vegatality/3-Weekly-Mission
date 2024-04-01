import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNewFolder } from '@api/folder/createNewFolder';
import { folderQueryKeys } from '@queries/folder';

export const useCreateNewFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderQueryKeys.masterKey() });
    },
  });
};
