import { useMutation } from '@tanstack/react-query';

import { signin } from '@apis/auth';

export const useSignin = () => {
  return useMutation({ mutationFn: signin });
};
