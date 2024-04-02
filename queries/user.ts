import { getCurrentUserProfileData } from '@apis/user/getCurrentUserProfileData';
import { getFolderOwnerProfileData } from '@apis/user/getUserProfileData';

export const userQueryKeys = {
  masterKey: () => ['user'],
  currentUserProfile: () => [...userQueryKeys.masterKey(), 'current-user'],
  folderOwnerProfile: (userId: number) => [...userQueryKeys.masterKey(), userId],
};

export const userQuery = {
  currentUserProfile: () => ({
    queryKey: userQueryKeys.currentUserProfile(),
    queryFn: getCurrentUserProfileData,
  }),
  folderOwnerProfile: (userId: number) => ({
    queryKey: userQueryKeys.folderOwnerProfile(userId),
    queryFn: () => getFolderOwnerProfileData(userId),
  }),
};
