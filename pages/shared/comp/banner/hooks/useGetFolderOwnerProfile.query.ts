import { useQuery } from '@tanstack/react-query';

import { userQuery } from '@queries/user';

export const useGetFolderOwnerProfile = (userId: number) => {
  return useQuery({ ...userQuery.folderOwnerProfile(userId), select: (data) => data[0] });
};
