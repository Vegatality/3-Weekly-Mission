import { getWithAccessToken } from '@api/instance/getWithAccessToken';

import { GetCurrentUserProfileDataResponse } from './types';

const GET_PROFILE_DATA_API = '/users';

/**
 * 현재 로그인한 유저 정보 얻기
 */
const getCurrentUserProfileData = async () => {
  return getWithAccessToken<GetCurrentUserProfileDataResponse>(GET_PROFILE_DATA_API);
};

export { getCurrentUserProfileData };
