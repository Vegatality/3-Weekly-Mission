import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editFolderName } from '@apis/folder';
import { folderQueryKeys } from '@queries/folder';

export const useEditFolderName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editFolderName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderQueryKeys.masterKey() });
    },
  });
};
