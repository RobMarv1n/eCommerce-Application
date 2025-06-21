import { Country } from 'postal-code-validator';

export const MOCK_DEFAULT_SHIPPING_ADDRESS = {
  street: 'Zelenaya',
  city: 'Zelenogorsk',
  country: Country.Russia,
  zipCode: '123456',
  defaultForShipping: true,
  defaultForBilling: false,
};

export const MOCK_DEFAULT_BILLING_ADDRESS = {
  street: 'Krasnaya',
  city: 'Krasnogorsk',
  country: Country.Russia,
  zipCode: '567890',
  defaultForShipping: false,
  defaultForBilling: true,
};

export const MOCK_DEFAULT_ADDRESS = {
  street: '',
  city: '',
  country: Country.Russia,
  zipCode: '',
  defaultForShipping: false,
  defaultForBilling: false,
};
