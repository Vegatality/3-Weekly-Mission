import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLink } from '@api/link';
import { folderQueryKeys } from '@queries/folder';
import { linkQueryKeys } from '@queries/link';

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderQueryKeys.masterKey() });
      queryClient.invalidateQueries({ queryKey: linkQueryKeys.masterKey() });
    },
  });
};
