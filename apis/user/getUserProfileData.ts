import { fetchWithGet } from '@apis/instance/fetchWithGet';

import { FolderOwnerProfileResponse } from './types';

const GET_SHARED_USER_PROFILE_API = '/users';

/**
 * 폴더 주인 유저 정보 가져오기
 */
export const getFolderOwnerProfileData = async (userId: number) => {
  return fetchWithGet<FolderOwnerProfileResponse>(`${GET_SHARED_USER_PROFILE_API}/${userId}`);
};
