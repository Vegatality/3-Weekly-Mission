import { fetchWithPost } from '@api/instance/fetchWithPost';

interface CheckEmailDuplicationResponse {
  isUsableEmail: boolean;
}

const EMAIL_DUPLICATION_CHECK_API = '/users/check-email';

export const checkEmailDuplication = async (email: string) => {
  return fetchWithPost<{ email: string }, CheckEmailDuplicationResponse>(EMAIL_DUPLICATION_CHECK_API, { email });
};
