type AnyAwaitableFunction = (...args: any[]) => Promise<any>;
type AnyAwaitableResult = Promise<any>;
type PromiseAllFactoryReturnType<T extends AnyAwaitableFunction[] | AnyAwaitableResult[]> = Promise<{
  [P in keyof T]: T[P] extends AnyAwaitableFunction ? Awaited<ReturnType<T[P]>> : Awaited<T[P]>;
}>;

export const promiseAllFactory = async <T extends AnyAwaitableFunction[] | AnyAwaitableResult[]>(
  promises: readonly [...T],
): PromiseAllFactoryReturnType<T> => {
  return Promise.all(
    promises.map((promise) => {
      if (typeof promise === 'function') {
        return promise();
      }

      return promise;
    }),
  ) as PromiseAllFactoryReturnType<T>;
};
