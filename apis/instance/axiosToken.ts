import axios, { AxiosError, InternalAxiosRequestConfig, isAxiosError } from 'axios';

import { getAccessToken } from '@utils/local-storage/getAccessToken';
import { logOnDev } from '@utils/logger/logOnDev';

export const axiosToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  timeoutErrorMessage: 'Request timeout, please try again later',
});

axiosToken.interceptors.request.use(
  (config) => {
    const { method, url } = config;
    logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

    if (getAccessToken()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }

    return config;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    if (isAxiosError(error)) {
      const { method, url } = error.config as InternalAxiosRequestConfig;
      logOnDev(`☢️ [API] ${method?.toUpperCase()} ${url} | Response`);
    } else {
      logOnDev(`☢️ [API] | Error ${error.message} Response`);
    }

    return Promise.reject(error);
  },
);

axiosToken.interceptors.response.use(
  (response) => {
    // 실패하면 다시 보내는 로직(액세스 토큰이 만료되었을 때)
    // 리프레쉬 토큰을 서버로 보내는 로직
    return response;
  },

  (error: AxiosError | Error): Promise<AxiosError> => {
    // const originalConfig = error.config;

    if (isAxiosError(error)) {
      // 401 인증 오류
      if (error.response?.status === 401) {
        // 리프레쉬 토큰을 서버로 보내는 로직 (아직 과제 아님)
      }

      // 400 토큰 갱신 오류 (아직 과제 아님)
    }

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
