import { ParsedUrlQuery } from 'querystring';

import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { getFolderInfo } from '@apis/folder/getFolderInfo';
import { getStringTypeError } from '@apis/util/getStringTypeError';
import { getQueryClient } from '@lib/getQueryClient';
import { promiseAllFactory } from '@utils/promise/promiseAllFactory';

import Article from './comp/article/Article';
import Banner from './comp/banner/Banner';
import Footer from './comp/footer/Footer';
import Header from './comp/header/Header';
import { usePrefetchFolderLinks } from './hooks/usePrefetchFolderLinks.query';
import { usePrefetchUserProfileData } from './hooks/usePrefetchUserProfileData.query';

interface SharedPageQuery extends ParsedUrlQuery {
  folderId?: string;
  folder?: string;
  user?: string;
}

interface SharedPageParams extends ParsedUrlQuery {
  folderId?: string;
}

interface SharedPageProps {
  folderId: number;
  folderName: string;
  userId: number;
  dehydratedState: DehydratedState;
}

const SharedPage = ({ folderId, userId, folderName }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Linkbrary shared page</title>
      </Head>
      <Header />
      <Banner userId={userId} folderName={folderName} />
      <Article folderId={folderId} />
      <Footer />
    </>
  );
};

export default SharedPage;

export const getServerSideProps: GetServerSideProps<SharedPageProps> = async (context) => {
  const { folder, user } = context.query as SharedPageQuery;
  const { folderId } = context.params as SharedPageParams;

  if (folderId === undefined || folder === undefined || user === undefined) {
    console.error('folderId, folder, or user should not be undefined.');

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const queryClient = getQueryClient();

  try {
    const numericFolderId = Number(folderId);

    const getFolderInfoAndPrefetchFolderLinks = async (folderId: number) => {
      const sharedFolderResponse = await getFolderInfo(folderId);
      const { user_id, name } = sharedFolderResponse[0];
      await usePrefetchUserProfileData(user_id);

      return { user_id, name };
    };

    const promiseAllResult = await promiseAllFactory([
      getFolderInfoAndPrefetchFolderLinks(numericFolderId),
      usePrefetchFolderLinks(numericFolderId),
    ]);
    const { name, user_id } = promiseAllResult[0];

    return {
      props: {
        folderId: numericFolderId,
        folderName: name,
        userId: user_id,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error(getStringTypeError(error));

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
