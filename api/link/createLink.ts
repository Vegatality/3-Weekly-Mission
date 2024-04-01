import { AxiosResponse } from 'axios';

import { axiosToken } from '@api/instance/axiosToken';

import { Link } from './types';

// 201 생성
// 400 요청 오류
// 401 인증 오류
// 403 권한 오류

interface CreateLinkParam {
  url: string;
  folderId: number;
}

interface CreateLinkRequestBody {
  url: string;
  folderId: number;
}

const CREATE_LINK_API = '/links';

export const createLink = async ({ folderId, url }: CreateLinkParam) => {
  const response = await axiosToken.post<Link, AxiosResponse<Link>, CreateLinkRequestBody>(CREATE_LINK_API, {
    url,
    folderId,
  });

  return response.data;
};
