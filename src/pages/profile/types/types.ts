import { Country } from 'postal-code-validator';

export type AccountSettingsData = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
};

export type PasswordChangeData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type AccountBillingAddressData = {
  street: string;
  city: string;
  zipCode: string;
  country: Country;
};

export type AccountShippingAddressData = {
  street: string;
  city: string;
  zipCode: string;
  country: Country;
};

export type AccountAddressesData = [
  {
    shippingAddress: AccountShippingAddressData;
    billingAddress: AccountBillingAddressData;
  },
];
