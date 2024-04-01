import { useMemo } from 'react';

import Image from 'next/image';

import { FolderDeleteModal } from '@components/ui/molecules/modal/folder-delete-modal';
import { FolderEditModal } from '@components/ui/molecules/modal/folder-edit-modal';
import { FolderShareModal } from '@components/ui/molecules/modal/folder-share-modal';
import { useGetFolderId } from '@pages/folder/hooks/useGetFolderId';

import { useModalList } from '@hooks/use-modal';

import styles from './CardContainerOptions.module.css';

interface CardContainerOptionsProps {
  folderName: string;
}

const CardContainerOptions = ({ folderName }: CardContainerOptionsProps) => {
  const { openModalList } = useModalList();

  const folderId = useGetFolderId();

  const folderOptions = useMemo(
    () => [
      { source: 'share', optionName: '공유', ModalComponent: FolderShareModal },
      {
        source: 'pen',
        optionName: '이름 변경',
        ModalComponent: FolderEditModal,
      },
      {
        source: 'delete',
        optionName: '삭제',
        ModalComponent: FolderDeleteModal,
      },
    ],
    [],
  );

  return (
    <div className={styles['card-container-options-box']}>
      {folderOptions.map(({ ModalComponent, optionName, source }) => (
        <button
          type='button'
          className={styles['card-container-options-btn']}
          key={optionName}
          onClick={() => {
            if (folderId) {
              openModalList({
                modalKey: [optionName],
                ModalComponent,
                props: { folderName, folderId },
              });
            }
          }}
        >
          <Image
            width={18}
            height={18}
            className={styles['card-container-options-icon']}
            src={`/images/folder/${source}.svg`}
            alt={`${optionName} 기능 버튼`}
          />
          <span className={styles['card-container-options-text']}>{optionName}</span>
        </button>
      ))}
    </div>
  );
};

export default CardContainerOptions;
