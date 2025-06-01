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

export type ProductData = {
  id: string;
  title: string;
  images: string[];
  descriptionShort: string;
  descriptionFull: string;
  price: number;
  discountedPrice: number;
  categoryName: string;
};

export type AttributesData = {
  [index: string]: string;
  title: string;
  descriptionShort: string;
  descriptionFull: string;
};
