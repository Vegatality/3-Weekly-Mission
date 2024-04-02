import { AxiosError, isAxiosError } from 'axios';

/**
 * 이 함수의 반환 값을 throw 하는 데 사용해야 한다.
 */
const getObjectTypeError = (err: unknown): AxiosError | Error => {
  if (isAxiosError(err)) {
    return err;
  }

  return new Error(String(err));
};

export { getObjectTypeError };
