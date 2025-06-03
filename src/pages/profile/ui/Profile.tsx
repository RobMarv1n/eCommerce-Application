import { useEffect } from 'react';
import { AccountAddresses } from './components/AccountAddresses';
import { AccountSettings } from './components/AccountSettings';
import { PasswordChange } from './components/PasswordChange';
import './profile.css';
import { client } from '../../../shared/api/clientApi/ClientApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../types';

export function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!client.isLogin) navigate(ROUTES.HOME);
  }, []);

  if (!client.isLogin) return <></>;

  return (
    <>
      <h1 className="visually-hidden">Profile Page</h1>
      <AccountSettings />
      <PasswordChange />
      <AccountAddresses />
    </>
  );
}
