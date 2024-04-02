import { useEffect } from 'react';

import { UseQueryResult } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import { objectFit } from '@style/object-fit/object-fit';

import LoginButton from '@components/ui/atoms/button/login-btn/LoginButton';

import { UserType } from '@apis/user';
import { setUserId } from '@utils/session-storage/setUserId';

import styles from './CommonHeader.module.css';
import LoginSuccessProfile from './comp/login-success-profile/LoginSuccessProfile';

const cn = classNames.bind(styles);

type CommonHeaderProps = {
  profileData: UseQueryResult<UserType.CurrentUserProfileData, Error>;
};

const CommonHeader = ({ profileData }: CommonHeaderProps) => {
  const { data, status } = profileData;

  useEffect(() => {
    if (status === 'success' && data.id) {
      // sessionStorate에 userId 저장
      setUserId(data.id);
    }
  }, [data, status]);

  return (
    <header id='header' role='heading' aria-level={1}>
      <nav className={cn('gnb', 'absolute')} role='navigation'>
        <Link href='/' rel='nofollow' className={cn('logo')}>
          <Image
            priority
            fill
            alt='symlink logo linked to home'
            css={objectFit.cover}
            src={'/images/logo/landing-logo.svg'}
          />
        </Link>
        {status === 'success' && data?.email ? (
          <LoginSuccessProfile profileData={data} />
        ) : (
          <LoginButton>로그인</LoginButton>
        )}
      </nav>
    </header>
  );
};

export default CommonHeader;
