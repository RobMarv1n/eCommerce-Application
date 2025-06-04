import { AccountSettingsData } from '../../../pages/profile/types/types';
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
  rating: string;
};

export type AttributesData = {
  [index: string]: string;
  title: string;
  descriptionShort: string;
  descriptionFull: string;
  rating: string;
};

export type Subcategory = {
  id: string;
  name: string;
};

export type MainCategory = {
  id: string;
  name: string;
  subCategory: Subcategory[];
};

export type ProfileData = {
  version: number;
  accountSettingData: AccountSettingsData;
};

export type PriceRange = {
  min: number;
  max: number;
};

export type RangeObject = {
  ranges: PriceRange[];
};

export enum SortingTypes {
  DEFAULT = 'default',
  NAME_ASC = 'variants.attributes.title asc',
  NAME_DESC = 'variants.attributes.title desc',
  PRICE_ASC = 'price asc',
  PRICE_DESC = 'price desc',
}

export enum QueryMode {
  FILTER = 'filter',
  SEARCH = 'search',
}
