import { fetchWithGet } from '@apis/instance/fetchWithGet';

import { FolderInfo } from './types';

export type GetFolderInfoResponse = FolderInfo[];

const GET_FOLDER_INFO_API = '/folders';

/**
 * 폴더 조회(링크 정보는 없음)
 */
export const getFolderInfo = async (folderId: number) => {
  return fetchWithGet<GetFolderInfoResponse>(`${GET_FOLDER_INFO_API}/${folderId}`);
};
