export type RegistrationFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: RegistrationAddress;
  country: string;
};

export type RegistrationAddress = {
  street: string;
  city: string;
  zipCode: string;
  country: string;
};
