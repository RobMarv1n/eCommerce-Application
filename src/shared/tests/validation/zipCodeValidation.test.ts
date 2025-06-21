import { Country } from 'postal-code-validator';
import { describe, expect, test } from 'vitest';
import { zipCodeValidation } from '../../validation/zipCodeValidation';

const validZipCodeForUnitedKingdom = 'M1 1AA';
const validZipCodeForRussia = '123456';
const invalidZipCode = '12';

describe('zipCodeValidation', () => {
  test('should return error message if zip code is not available for selected country', () => {
    expect(zipCodeValidation(validZipCodeForRussia, Country.Vanuatu)).toBe(
      'Postal code is not available for selected country'
    );
  });

  test('should return error message if zip code is invalid', () => {
    expect(zipCodeValidation(invalidZipCode, Country.Russia)).toBe(
      'Invalid postal code'
    );
  });

  test('should return error message if zip code is not valid for selected country', () => {
    expect(
      zipCodeValidation(validZipCodeForUnitedKingdom, Country.Russia)
    ).toBe('Invalid postal code for selected country');
    expect(
      zipCodeValidation(validZipCodeForRussia, Country.UnitedKingdom)
    ).toBe('Invalid postal code for selected country');
  });

  test('should return undefined if zip code is valid for selected country', () => {
    expect(
      zipCodeValidation(validZipCodeForRussia, Country.Russia)
    ).toBeUndefined();
    expect(
      zipCodeValidation(validZipCodeForUnitedKingdom, Country.UnitedKingdom)
    ).toBeUndefined();
  });
});
