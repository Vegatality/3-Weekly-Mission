import axios, { AxiosError, InternalAxiosRequestConfig, isAxiosError } from 'axios';

import { logOnDev } from '@utils/logger/logOnDev';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  timeoutErrorMessage: 'Request timeout, please try again later',
});

axiosInstance.interceptors.request.use(
  null,

  (error) => {
    if (isAxiosError(error)) {
      const { method, url } = error.config as InternalAxiosRequestConfig;
      logOnDev(`🚨 [API] ${method?.toUpperCase} ${url} | Error ${error.message} | Request`);
    }

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  null,

  (error: AxiosError | Error): Promise<AxiosError> => {
    if (isAxiosError(error) && error.code === AxiosError.ECONNABORTED) {
      const { method, url } = error.config as InternalAxiosRequestConfig;
      logOnDev(`☢️ [API] ${method?.toUpperCase()} ${url} | Response`);
      error.message = '로그인 후 이용해 주세요.';

      return Promise.reject(error);
    }

    logOnDev(`☢️ [API] | Error ${error.message} Response`);

    return Promise.reject(error);
  },
);
