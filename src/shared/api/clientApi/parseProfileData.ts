import { Customer } from '@commercetools/platform-sdk';
import { ProfileData } from './types';
import { AccountSettingsData } from '../../../pages/profile/types/types';
import { DefaultAccountSettingData } from './constants';

export function parseProfileData(customer: Customer): ProfileData {
  const accountSettingData: AccountSettingsData = {
    email: customer.email,
    firstName: customer.firstName || DefaultAccountSettingData.firstName,
    lastName: customer.lastName || DefaultAccountSettingData.lastName,
    birthDate: customer.dateOfBirth || DefaultAccountSettingData.birthDate,
  };

  return { version: customer.version, accountSettingData };
}
