import { RegistrationFormData } from '../../../pages/registration/model/types';

export type singUpDTO = RegistrationFormData;

export type loginDTO = {
  email: string;
  password: string;
};

export type Category = {
  id: string;
  name: string;
};
