import { AxiosError } from 'axios';

import { axiosInstance } from './axiosInstance';

const fetchWithPost = async <T, R>(
  endPoint: string,
  body?: T,
  params?: ConstructorParameters<typeof URLSearchParams>[number],
): Promise<R> => {
  try {
    const response = await axiosInstance.post<R>(endPoint, body, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error('🚀 ~ fetchWithPost ~ error:', error);

    if (error instanceof AxiosError) {
      throw new Error(String(error.response?.data.error?.status || error.response?.status));
    }

    throw error;
  }
};

export { fetchWithPost };
