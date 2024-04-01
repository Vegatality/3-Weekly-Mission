import { useQuery } from '@tanstack/react-query';

import { userQuery } from '@queries/user';

const useGetCurrentUserProfileData = () => {
  return useQuery({ ...userQuery.currentUserProfile(), select: (data) => data[0] });
};

export { useGetCurrentUserProfileData };
