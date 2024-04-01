import { ParsedUrlQuery } from 'querystring';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

interface FolderIdQuery extends ParsedUrlQuery {
  folderId: string[];
}

export const useGetFolderId = (): number | undefined => {
  const router = useRouter();

  const [folderId, setFolderId] = useState<number>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { folderId: fi } = router.query as FolderIdQuery;

    if (!fi) {
      return;
    }

    const folderId = fi[0];
    const numericFolderId = Number(folderId);

    setFolderId(numericFolderId);
  }, [router, router.isReady]);

  return folderId;
};
