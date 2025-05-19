export function validationPassword(value: string) {
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
