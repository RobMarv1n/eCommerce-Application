export function cityValidation(value: string) {
  if (/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
    return 'City must not contain special characters';
  } else if (/[0-9]/.test(value)) {
    return 'City must not contain numbers';
  }
}

export const cityValidationRules = {
  required: 'This field is required',
  minLength: {
    value: 1,
    message: 'Minimum length should be 1 character',
  },
  validate: (value: string) => value === '' || cityValidation(value),
};
