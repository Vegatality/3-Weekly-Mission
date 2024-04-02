import { fetchWithPost } from '@apis/instance/fetchWithPost';

import { SignParams, SignResponse } from './types';

const SIGNUP_API = '/auth/sign-up';

export const signup = async ({ email, password }: SignParams) => {
  return fetchWithPost<SignParams, SignResponse>(SIGNUP_API, { email, password });
};
