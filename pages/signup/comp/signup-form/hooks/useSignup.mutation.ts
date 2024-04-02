import { useMutation } from '@tanstack/react-query';

import { signup } from '@apis/auth';

export const useSignup = () => {
  return useMutation({ mutationFn: signup });
};
