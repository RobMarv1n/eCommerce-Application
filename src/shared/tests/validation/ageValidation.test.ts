import { describe, expect, test } from 'vitest';
import {
  ageValidation,
  ageValidationRules,
} from '../../validation/ageValidation';

const invalidMinDate = '2025-06-11';
const invalidMaxDate = '1900-06-11';
const validDate = '2000-06-11';

describe('ageValidation', () => {
  test('should return error message if age is less than 14', () => {
    const result = ageValidation(String(invalidMinDate));
    const validationRulesResult = ageValidationRules.validate(invalidMinDate);
    expect(result).toBe('You must be at least 14 years old');
    expect(validationRulesResult).toBe('You must be at least 14 years old');
  });

  test('should return error message if age is more than 100', () => {
    const result = ageValidation(String(invalidMaxDate));
    const validationRulesResult = ageValidationRules.validate(invalidMaxDate);
    expect(result).toBe('You must be at most 100 years old');
    expect(validationRulesResult).toBe('You must be at most 100 years old');
  });

  test('should return undefined if age is valid', () => {
    const result = ageValidation(String(validDate));
    const validationRulesResult = ageValidationRules.validate(validDate);
    expect(result).toBeUndefined();
    expect(validationRulesResult).toBeUndefined();
  });
});
