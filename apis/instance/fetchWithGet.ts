import { AxiosRequestConfig } from 'axios';

import { axiosInstance } from './axiosInstance';

const fetchWithGet = async <T>(endPoint: string, params?: AxiosRequestConfig['params']): Promise<T> => {
  const response = await axiosInstance.get<T>(endPoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });

  return response.data;
};

export { fetchWithGet };
