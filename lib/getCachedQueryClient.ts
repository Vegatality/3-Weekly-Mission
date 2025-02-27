import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

export const getCachedQueryClient = cache(() => new QueryClient());
