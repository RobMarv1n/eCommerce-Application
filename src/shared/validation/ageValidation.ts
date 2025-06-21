const minAge = 14;
const maxAge = 100;
const yearsInMilliseconds = 1000 * 60 * 60 * 24 * 365;

export const ageValidation = (value: string) => {
  const currentDate = Date.now();
  const birthDate = new Date(value).getTime();
  const age = Math.floor((currentDate - birthDate) / yearsInMilliseconds);
  if (age < minAge) {
    return 'You must be at least 14 years old';
  } else if (age >= maxAge) {
    return 'You must be at most 100 years old';
  }
};

export const ageValidationRules = {
  required: false,
  validate: (value: string) => value === '' || ageValidation(value),
};
