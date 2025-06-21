export function passwordValidation(value: string | unknown) {
  if (typeof value !== 'string') {
    return;
  }

  if (!(value === value.trim())) {
    return 'Password must not contain trailing spaces';
  } else if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  } else if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one capital letter';
  } else if (!/\d/.test(value)) {
    return 'Password must contain at least one digit';
  } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
    return 'Password must contain at least one special character';
  }
}

export const passwordValidationRules = {
  required: 'This field is required',
  minLength: {
    value: 8,
    message: 'Minimum length should be 8 characters',
  },
  maxLength: {
    value: 25,
    message: 'Maximum length should be 25 characters',
  },
  validate: passwordValidation,
};
