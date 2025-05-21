export function nameValidation(value: string) {
  if (/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
    return 'First name must not contain special characters';
  }
}
