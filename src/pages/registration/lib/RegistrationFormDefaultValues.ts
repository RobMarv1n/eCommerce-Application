import { Country } from 'postal-code-validator';

export const RegistrationFormDefaultValues = {
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
    useAsDefaultForShipping: false,
    useShippingAsBilling: false,
  },
  billingAddress: {
    street: '',
    city: '',
    zipCode: '',
    country: Country.Russia,
    useAsDefaultForBilling: false,
  },
};
