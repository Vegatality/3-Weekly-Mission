import CommonHeader from '@components/ui/organisms/header/contents-page-header/CommonHeader';
import { useGetCurrentUserProfileData } from '@pages/hooks/useGetCurrentUserProfileData.query';

const Header = () => {
  const profileData = useGetCurrentUserProfileData();

  return <CommonHeader profileData={profileData} />;
};

export default Header;
