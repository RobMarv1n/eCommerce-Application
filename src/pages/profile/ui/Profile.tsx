import { AccountAddresses } from './components/AccountAddresses';
import { AccountSettings } from './components/AccountSettings';
import { PasswordChange } from './components/PasswordChange';

export function Profile() {
  return (
    <>
      <h1 className="visually-hidden">Profile Page</h1>
      <AccountSettings />
      <PasswordChange />
      <AccountAddresses />
    </>
  );
}
