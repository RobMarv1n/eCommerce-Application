export function nameValidation(value: string) {
  if (/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
    return 'First name must not contain special characters';
  }
}

export const nameValidationRules = {
  required: false,
  minLength: {
    value: 1,
    message: 'Minimum length should be 1 character',
  },
  validate: (value: string) => value === '' || nameValidation(value),
};
