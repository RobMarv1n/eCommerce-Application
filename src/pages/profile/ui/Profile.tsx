import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../../../shared/api/clientApi/ClientApi';
import { ROUTES } from '../../../types';
import { AccountAddresses } from './components/AccountAddresses';
import { AccountSettings } from './components/AccountSettings';
import { PasswordChange } from './components/PasswordChange';
import './profile.css';

export function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!client.isLogin) navigate(ROUTES.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!client.isLogin) return <></>;

  return (
    <div className="profile-page">
      <h1 className="visually-hidden">Profile Page</h1>
      <AccountSettings />
      <PasswordChange />
      <AccountAddresses />
    </div>
  );
}
