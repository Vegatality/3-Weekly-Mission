import { useState } from 'react';

import classNames from 'classnames/bind';

import SelectMenu from '@components/ui/atoms/select-menu';
import LinkCard from '@components/ui/molecules/card/link-card';
import { TCardProviderContext } from '@components/ui/molecules/card/link-card/context/CardProvider';
import { AddToFolderModal } from '@components/ui/molecules/modal/add-to-folder-modal';
import { LinkDeleteModal } from '@components/ui/molecules/modal/link-delete-modal';
import { useFolderNameAndLinkCount } from '@pages/folder/hooks/useFolderNameAndLinkCount.query';
import { useGetFolderId } from '@pages/folder/hooks/useGetFolderId';

import { LinkType } from '@apis/link';
import { useModalList, useToggleModal } from '@hooks/use-modal';

import styles from './Card.module.css';

const cn = classNames.bind(styles);

type CardProps = {
  link: LinkType.Link;
};

const Card = ({ link }: CardProps) => {
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null);
  const { isModalOpen, modalRef, toggleModal } = useToggleModal<HTMLDivElement>();
  const { data, status } = useFolderNameAndLinkCount();
  const folderId = useGetFolderId();

  const handleKebabButton = (linkId: number) => {
    setSelectedLinkId(linkId);
    toggleModal();
  };

  const { openModalList } = useModalList();

  const handleDeleteMenuBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ModalComponent: typeof LinkDeleteModal,
    linkUrl: string,
    linkId: number,
  ) => {
    e.preventDefault();

    openModalList({ modalKey: ['linkDeleteModal'], ModalComponent, props: { linkUrl, linkId } });
  };

  const handleFolderAddMenuBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ModalComponent: typeof AddToFolderModal,
    linkUrl: string,
    folderId?: number,
  ) => {
    e.preventDefault();

    if (status === 'success') {
      openModalList({ modalKey: ['addToFolderModal'], ModalComponent, props: { linkUrl, folderId, folderList: data } });
    }
  };

  const processedFolderPageLinkData: TCardProviderContext = {
    linkId: link.id,
    createdAt: link.created_at,
    description: link.description,
    imageSource: link.image_source,
    url: link.url,
    title: link.title,
    favorite: link.favorite,
  };

  return (
    <LinkCard {...processedFolderPageLinkData}>
      <LinkCard.CardCover asAnchor className={cn('link-card')}>
        <div className={cn('card-image-box')}>
          <LinkCard.CardImage className={cn('link-image')} alt='카드 링크 이미지' />
          <LinkCard.Bookmark />
        </div>
        <div className={cn('link-text-box', 'relative')}>
          <div className={cn('justify-between')}>
            <LinkCard.TimeElapsed className={cn('link-elapsed')} />
            <LinkCard.KebabButton onClickHandler={() => handleKebabButton(link.id)} />
            {selectedLinkId === link.id && isModalOpen && (
              <SelectMenu modalRef={modalRef}>
                <SelectMenu.StMenuButton onClick={(e) => handleDeleteMenuBtn(e, LinkDeleteModal, link.url, link.id)}>
                  삭제하기
                </SelectMenu.StMenuButton>
                <SelectMenu.StMenuButton
                  onClick={(e) => handleFolderAddMenuBtn(e, AddToFolderModal, link.url, folderId)}
                >
                  폴더에 추가
                </SelectMenu.StMenuButton>
              </SelectMenu>
            )}
          </div>
          <LinkCard.Description className={cn('link-description')} />
          <LinkCard.CreatedAt className={cn('link-createdAt')} />
        </div>
      </LinkCard.CardCover>
    </LinkCard>
  );
};

export default Card;
