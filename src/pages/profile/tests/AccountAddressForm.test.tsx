import { render } from '@testing-library/react';
import { Country } from 'postal-code-validator';
import { describe, expect, test } from 'vitest';
import { AccountAddressFormProperties } from '../types/types';
import { AccountAddressForm } from '../ui/components/AccountAddressForm';

describe('AccountAddressForm', () => {
  const mockData: AccountAddressFormProperties = {
    id: '1',
    AccountAddressFormFormData: {
      street: 'street',
      city: 'city',
      country: Country.Russia,
      zipCode: '123456',
      defaultForShipping: false,
      defaultForBilling: false,
    },
    isShowInModal: false,
  };

  test('should render form with fields street, city, country, zipCode', () => {
    const { getByRole } = render(<AccountAddressForm {...mockData} />);

    expect(getByRole('textbox', { name: 'Address' })).toBeInTheDocument();
    expect(getByRole('textbox', { name: 'City' })).toBeInTheDocument();
    expect(getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
    expect(getByRole('textbox', { name: 'Zip Code' })).toBeInTheDocument();
  });
});
