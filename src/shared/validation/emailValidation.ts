export function emailValidation(value: string) {
  if (!(value === value.trim())) {
    return 'Email must not contain trailing spaces';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return 'Expected format: user@example.com';
  }
}

export const emailValidationRules = {
  required: true,
  validate: emailValidation,
};
