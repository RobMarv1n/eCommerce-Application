import { describe, expect, test } from 'vitest';
import { cityValidation } from '../../validation/cityValidation';

describe('cityValidation', () => {
  test('should return error message if city contains special characters', () => {
    const result = cityValidation('New@York');
    expect(result).toBe('City must not contain special characters');
  });

  test('should return error message if city contains numbers', () => {
    const result = cityValidation('NewYork123');
    expect(result).toBe('City must not contain numbers');
  });

  test('should return undefined if city is valid', () => {
    const result = cityValidation('New York');
    expect(result).toBeUndefined();
  });
});
