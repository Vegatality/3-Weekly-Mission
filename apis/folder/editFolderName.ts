import { AxiosResponse } from 'axios';

import { axiosToken } from '@apis/instance/axiosToken';

import { EditFolder, EditFolderNameParam } from './types';

type EditFolderResponse = EditFolder[];

interface EditFolderRequestBody {
  name: string;
}

const EDIT_FOLDER_NAME_API = (folderId: number) => `/folders/${folderId}`;

export const editFolderName = async ({ folderId, name }: EditFolderNameParam) => {
  const response = await axiosToken.put<EditFolderResponse, AxiosResponse<EditFolderResponse>, EditFolderRequestBody>(
    EDIT_FOLDER_NAME_API(folderId),
    { name },
  );

  return response.data;
};
