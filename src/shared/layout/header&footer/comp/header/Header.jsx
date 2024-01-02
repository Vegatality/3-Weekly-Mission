import { useEffect, useState } from 'react';
import { getProFileData } from '../../../../../api/getProfileData';
import LoginSuccessProfile from './comp/login-success-profile/LoginSuccessProfile';
import LoginButton from './comp/login-button/LoginButton';
import './Header.css';

const useGetProfileData = () => {
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await getProFileData();
      setProfileData(data);
    })();
  }, []);
  return profileData;
};

const Header = () => {
  const profileData = useGetProfileData();
  return (
    <header id='header' role='heading' aria-level={1}>
      <nav className='gnb' role='navigation'>
        <a href='/' rel='nofollow'>
          <img alt='symlink logo linked to home' src={`${process.env.PUBLIC_URL}/images/logo/landing-logo.svg`} />
        </a>
        {profileData?.email ? <LoginSuccessProfile profileData={profileData} /> : <LoginButton>로그인</LoginButton>}
      </nav>
    </header>
  );
};
export default Header;
