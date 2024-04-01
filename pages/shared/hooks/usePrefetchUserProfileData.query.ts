import { getQueryClient } from '@lib/getQueryClient';
import { userQuery } from '@queries/user';

/**
 * 폴더 주인 유저 정보 프리패치
 */
export const usePrefetchUserProfileData = async (userId: number) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({ ...userQuery.folderOwnerProfile(userId) });
};
