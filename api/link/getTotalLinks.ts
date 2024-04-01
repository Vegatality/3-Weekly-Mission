import { getWithAccessToken } from '@api/instance/getWithAccessToken';

import { Link } from './types';

type GetToTalLinksResponse = Link[];

const GET_TOTAL_LINKS_API = '/links';

export const getTotalLinks = async () => {
  return getWithAccessToken<GetToTalLinksResponse>(GET_TOTAL_LINKS_API);
};
