import { Country } from 'postal-code-validator';
import { FieldError } from 'react-hook-form';

export type RegistrationFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  shippingAddress: RegistrationAddress;
  billingAddress: RegistrationAddress;
};

export type RegistrationAddress = {
  street: string;
  city: string;
  zipCode: string;
  country: Country;
};

export type RegistrationFieldState = {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  isValidating: boolean;
  error?: FieldError;
};
