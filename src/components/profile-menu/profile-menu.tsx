import { logoutAction } from '@slices';
import { ProfileMenuUI } from '@ui';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
