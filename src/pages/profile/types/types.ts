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

type AccountAddressFormData = {
  street: string;
  city: string;
  zipCode: string;
  country: Country;
};
export type AccountBillingAddressData = AccountAddressFormData & {
  defaultForBilling: boolean;
};

export type AccountShippingAddressData = AccountAddressFormData & {
  defaultForShipping: boolean;
};

export type AccountAddressesData = {
  shippingAddress: AccountShippingAddressData;
  billingAddress: AccountBillingAddressData;
};
