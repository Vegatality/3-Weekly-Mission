import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLink } from '@api/link';
import { linkQueryKeys } from '@queries/link';

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkQueryKeys.masterKey() });
    },
  });
};
