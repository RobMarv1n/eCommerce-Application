import { Customer } from '@commercetools/platform-sdk';
import { AccountAddress, ProfileData } from './types';
import { AccountSettingsData } from '../../../pages/profile/types/types';
import { DefaultAccountSettingData } from './constants';
import { getCountry } from './getCountry';

export function parseProfileData(customer: Customer): ProfileData {
  const accountSettingData: AccountSettingsData = {
    email: customer.email,
    firstName: customer.firstName || DefaultAccountSettingData.firstName,
    lastName: customer.lastName || DefaultAccountSettingData.lastName,
    birthDate: customer.dateOfBirth || DefaultAccountSettingData.birthDate,
  };

  const accountAddresses: AccountAddress[] = customer.addresses.map(
    (address) => ({
      id: address.id || '',
      street: address.streetName || '',
      city: address.city || '',
      zipCode: address.postalCode || '',
      country: getCountry(address.country),
      defaultForShipping: false,
      defaultForBilling: false,
    })
  );

  for (const address of accountAddresses) {
    if (address.id === customer.defaultBillingAddressId)
      address.defaultForBilling = true;
    if (address.id === customer.defaultShippingAddressId)
      address.defaultForShipping = true;
  }

  return { version: customer.version, accountSettingData, accountAddresses };
}
