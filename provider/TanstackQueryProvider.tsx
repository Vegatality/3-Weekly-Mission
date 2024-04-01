import { PropsWithChildren, useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { styled } from 'styled-components';

import { getQueryClient } from '@lib/getQueryClient';

type ProviderProps = PropsWithChildren;

export default function TanstackQueryProviders({ children }: ProviderProps) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <TextAligner>
        <ReactQueryDevtools initialIsOpen={false} />
      </TextAligner>
    </QueryClientProvider>
  );
}

const TextAligner = styled.div`
  font-size: 16px;
`;
