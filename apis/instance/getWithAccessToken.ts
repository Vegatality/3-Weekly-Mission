import { AxiosRequestConfig } from 'axios';

import { getObjectTypeError } from '@apis/util/getObjectTypeError';

import { axiosToken } from './axiosToken';

const getWithAccessToken = async <T>(endPoint: string, params?: AxiosRequestConfig['params']): Promise<T> => {
  try {
    const response = await axiosToken.get<T>(endPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error('🚀 ~ getWithAccessToken ~ error:', error);

    throw getObjectTypeError(error);
  }
};

export { getWithAccessToken };
