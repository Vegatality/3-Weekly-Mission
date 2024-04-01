import { useMutation } from '@tanstack/react-query';

import { signin } from '@api/auth';

export const useSignin = () => {
  return useMutation({ mutationFn: signin });
};
