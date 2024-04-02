import { axiosToken } from '@apis/instance/axiosToken';

// 204 삭제 성공
// 400 요청 오류
// 401 인증 오류
// 403 권한 오류

const DELETE_LINK_API = (linkId: number) => `/links/${linkId}`;

export const deleteLink = async (linkId: number) => {
  const response = await axiosToken.delete(DELETE_LINK_API(linkId));

  return response.data;
};
