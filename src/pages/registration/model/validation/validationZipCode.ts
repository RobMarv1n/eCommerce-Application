import {
  Country,
  countryHasPostalCodeSystem,
  isValidCountryPostalCode,
  isValidPostalCode,
} from 'postal-code-validator';

export function validationZipCode(value: string, country: Country) {
  if (countryHasPostalCodeSystem(country)) {
    return 'Postal code is not available for selected country';
  } else if (!isValidPostalCode(value)) {
    return 'Invalid postal code';
  } else if (isValidCountryPostalCode(value, country)) {
    return 'Invalid postal code for selected country';
  }
}
