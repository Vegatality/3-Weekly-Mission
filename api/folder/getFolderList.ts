import { getWithAccessToken } from '@api/instance/getWithAccessToken';

import { FolderCategoryData } from './types';

export type FolderCategoryResponse = FolderCategoryData[];

const GET_FOLDERS_DATA_API = '/folders';

/**
 * 유저의 모든 폴더 조회
 */
const getFolderList = async () => {
  return getWithAccessToken<FolderCategoryResponse>(GET_FOLDERS_DATA_API);
};

export { getFolderList };
