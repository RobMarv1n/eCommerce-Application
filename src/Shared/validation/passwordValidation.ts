export function validationPassword(value: string) {
  const minPasswordLength = value.length >= 8;
  const maxPasswordLength = value.length < 25;
  const hasOneLowercaseLetter = /[a-z]/.test(value);
  const hasOneCapitalLetter = /[A-Z]/.test(value);
  const hasOneDigit = /\d/.test(value);
  const hasOneSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value);
  const hasNoTrailingSpaces = value === value.trim();

  return (
    minPasswordLength &&
    maxPasswordLength &&
    hasOneLowercaseLetter &&
    hasOneCapitalLetter &&
    hasOneDigit &&
    hasOneSpecialChar &&
    hasNoTrailingSpaces
  );
}
