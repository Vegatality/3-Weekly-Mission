import { useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import { LinkType } from '@api/link';
import { useMatchedLinksWithDebounce } from '@hooks/useMatchedLinksWithDebounce';

import styles from './CardContainer.module.css';
import CardContainerOptions from './comp/card-container-options/CardContainerOptions';
import Card from './comp/card/Card';
import FolderLinkCategory from './comp/folder-link-category/FolderLinkCategory';
import { useGetSortedFolderLinksData } from './comp/hooks/useGetSortedFolderLinksData.query';
import { useGetTotalLinksDataQuery } from './comp/hooks/useGetTotalLinksData.query';

const cn = classNames.bind(styles);

type TCardContainerProps = {
  input?: string;
};

const CardContainer = ({ input }: TCardContainerProps) => {
  const [folderIdAndName, setFolderIdAndName] = useState<{ folderId: 'total' | number; folderName: string }>({
    folderId: 'total',
    folderName: '전체',
  });

  const router = useRouter();

  let sortedLinks: LinkType.Link[] = [];
  const sortedQueryResult = useGetSortedFolderLinksData(folderIdAndName.folderId);
  const { data: totalFolderLinks = [], status } = useGetTotalLinksDataQuery(folderIdAndName.folderId);

  if (folderIdAndName.folderId !== 'total' && sortedQueryResult) {
    const { data: sortedFolderLinks, status } = sortedQueryResult;

    if (status === 'success') {
      sortedLinks = sortedFolderLinks;
    }
  }

  if (folderIdAndName.folderId === 'total' && status === 'success') {
    sortedLinks = totalFolderLinks;
  }

  const matchedLinks = useMatchedLinksWithDebounce(sortedLinks, input, ['title', 'description', 'url']);

  return (
    <div className={cn('card-container-wrapper')}>
      <div className={cn('card-container-controllers')}>
        <FolderLinkCategory
          selectedFolderId={folderIdAndName.folderId}
          handleFolderIdAndName={setFolderIdAndName}
          router={router}
        />
        <div className={cn('card-container-name-option-box')}>
          <h3 className={cn('card-container-category-name')}>{folderIdAndName.folderName}</h3>
          {/* {folderIdAndName.folderId !== 'total' && !!sortedLinks?.length && <CardContainerOptions />} */}
          {folderIdAndName.folderId !== 'total' && <CardContainerOptions folderName={folderIdAndName.folderName} />}
        </div>
      </div>
      {sortedLinks?.length ? (
        <section className={cn('card-container')}>
          {matchedLinks.map((link) => (
            <Card key={link.id} link={link} />
          ))}
        </section>
      ) : (
        <div className={cn('no-links')}>저장된 링크가 없습니다.</div>
      )}
    </div>
  );
};

export default CardContainer;
