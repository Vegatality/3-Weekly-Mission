import { fetchWithGet } from '@apis/instance/fetchWithGet';

import { Link } from './types';

type SortedFolderLinksDataResponse = Link[];

const GET_FOLDER_LINKS_DATA_API = (folderId: number) => `folders/${folderId}/links`;

/**
 * 선택한 폴더 링크들 가져오기
 */
const getSortedFolderLinksData = async (folderId: number) => {
  return fetchWithGet<SortedFolderLinksDataResponse>(GET_FOLDER_LINKS_DATA_API(folderId));
};

export { getSortedFolderLinksData };
