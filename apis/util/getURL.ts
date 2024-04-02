type TGetUrlWithQs = (
  BASE_URL: string,
  endPoint: string,
  qs: ConstructorParameters<typeof URLSearchParams>[number],
) => URL;

const getUrlWithQs: TGetUrlWithQs = (BASE_URL, endPoint, qs) => {
  const url = new URL(`${BASE_URL}${endPoint}`);
  const searchParams = new URLSearchParams(qs);
  url.search = searchParams as unknown as string;

  return url;
};

export { getUrlWithQs };
