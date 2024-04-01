import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from './Banner.module.css';
import { useGetFolderOwnerProfile } from './hooks/useGetFolderOwnerProfile.query';

const cn = classNames.bind(styles);

interface BannerProps {
  userId: number;
  folderName: string;
}

const Banner = ({ userId, folderName }: BannerProps) => {
  const { data, status } = useGetFolderOwnerProfile(userId);

  return (
    <div className={cn('hero-banner')}>
      <div className={cn('avatar-box')}>
        <div className={cn('avatar-img__wrap')}>
          <Image
            fill
            className={cn('avatar')}
            alt='아바타'
            src={status === 'success' && data.image_source ? data.image_source : '/images/shared/shared-avatar.svg'}
          />
        </div>
        <span className={cn('folder-owner')}>{status === 'success' ? data.name : null}</span>
      </div>
      <h1 className={cn('folder-name')}>{folderName}</h1>
    </div>
  );
};

export default Banner;
