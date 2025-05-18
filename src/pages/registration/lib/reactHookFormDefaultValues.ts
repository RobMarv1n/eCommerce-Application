import { Country } from 'postal-code-validator';

export const reactHookFormDefaultValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  shippingAddress: {
    street: '',
    city: '',
    zipCode: '',
    country: Country.Russia,
  },
  billingAddress: {
    street: '',
    city: '',
    zipCode: '',
    country: Country.Russia,
  },
};
