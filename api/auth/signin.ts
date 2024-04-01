import { fetchWithPost } from '@api/instance/fetchWithPost';

import { SignParams, SignResponse } from './types';

const SIGNIN_API = '/auth/sign-in';

export const signin = async ({ email, password }: SignParams) => {
  return fetchWithPost<SignParams, SignResponse>(SIGNIN_API, { email, password });
};
