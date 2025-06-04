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

export type AccountAddressFormData = {
  street: string;
  city: string;
  zipCode: string;
  country: Country;
  defaultForShipping?: boolean;
  defaultForBilling?: boolean;
};

export type AccountAddressFormProperties = {
  AccountAddressFormFormData: AccountAddressFormData;
  isShowInModal?: boolean;
  children?: React.ReactNode;
  closeModal?: () => void;
  addresses?: AccountAddressFormData[];
  setAddresses?: (addresses: AccountAddressFormData[]) => void;
};
