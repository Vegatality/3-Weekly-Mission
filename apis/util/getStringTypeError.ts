/**
 * 이 함수의 반환 값을 throw 하는 데 사용해야 한다.
 */
const getStringTypeError = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
};

export { getStringTypeError };
