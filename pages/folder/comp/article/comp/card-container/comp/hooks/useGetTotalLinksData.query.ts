import { useQuery } from '@tanstack/react-query';

import { linkQuery } from '@queries/link';

export const useGetTotalLinksDataQuery = (enabled: 'total' | number) => {
  return useQuery({ ...linkQuery.masterQuery(), enabled: enabled === 'total' });
};
