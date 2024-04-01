import { memo } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import { UserType } from '@api/user';

import styles from './LoginSuccessProfile.module.css';

const cn = classNames.bind(styles);

type LoginSuccessProfileProps = {
  profileData: UserType.CurrentUserProfileData;
};

const LoginSuccessProfile = ({ profileData }: LoginSuccessProfileProps) => {
  const { email, image_source } = profileData;

  return (
    <div className={cn('account-box')}>
      <div className={cn('account-profile')}>
        <Image fill className={cn('account-profile__img')} src={image_source} alt='프로필 이미지' />
      </div>
      <p className={cn('account-text')}>{email}</p>
    </div>
  );
};

export default memo(LoginSuccessProfile);
