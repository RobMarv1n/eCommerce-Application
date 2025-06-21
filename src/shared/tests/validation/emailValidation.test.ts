import { describe, expect, test } from 'vitest';
import { emailValidation } from '../../validation/emailValidation';

const invalidEmail = 'invalidEmail';
const validEmail = 'user@example.com';

describe('emailValidation', () => {
  test('should return error message if email contains trailing spaces', () => {
    const result = emailValidation(validEmail + ' ');
    expect(result).toBe('Email must not contain trailing spaces');
  });

  test('should return error message if email is not valid', () => {
    const result = emailValidation(invalidEmail);
    expect(result).toBe('Expected format: user@example.com');
  });

  test('should return undefined if email is valid', () => {
    const result = emailValidation(validEmail);
    expect(result).toBeUndefined();
  });
});
