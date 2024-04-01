import { axiosToken } from '@api/instance/axiosToken';

// 204 삭제 성공
// 400 요청 오류
// 401 인증 오류
// 403 권한 오류

const DELETE_FOLDER_API = (folderId: number) => `/folders/${folderId}`;

export const deleteFolder = async (folderId: number) => {
  const response = await axiosToken.delete(DELETE_FOLDER_API(folderId));

  return response.data;
};
