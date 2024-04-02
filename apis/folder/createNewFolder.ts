import { AxiosResponse } from 'axios';

import { axiosToken } from '@apis/instance/axiosToken';

import { CreateFolder } from './types';

// 400
// {
//   "message": "name 값이 없습니다."
// }

// 401 인증 오류
// 403 권한 오류

type CreateNewFolderResponse = CreateFolder[];

interface CreateNewFolderRequestBody {
  name: string;
}

const CREATE_NEW_FOLDER = '/folders';

export const createNewFolder = async (name: string) => {
  const response = await axiosToken.post<
    CreateNewFolderResponse,
    AxiosResponse<CreateNewFolderResponse>,
    CreateNewFolderRequestBody
  >(CREATE_NEW_FOLDER, { name });

  return response.data;
};
