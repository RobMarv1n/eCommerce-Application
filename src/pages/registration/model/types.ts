import { Country } from 'postal-code-validator';
import { FieldError } from 'react-hook-form';

export type RegistrationFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  shippingAddress: RegistrationShippingAddress;
  billingAddress: RegistrationBillingAddress;
};

export type RegistrationAddress = {
  street: string;
  city: string;
  zipCode: string;
  country: Country;
};

export type RegistrationShippingAddress = RegistrationAddress & {
  useAsDefaultForShipping: boolean;
  useShippingAsBilling: boolean;
};

export type RegistrationBillingAddress = RegistrationAddress & {
  useAsDefaultForBilling: boolean;
};

export type RegistrationFieldState = {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  isValidating: boolean;
  error?: FieldError;
};
