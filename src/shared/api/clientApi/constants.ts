import { AccountSettingsData } from '../../../pages/profile/types/types';
import {
  CartData,
  MainCategory,
  ProductData,
  ProfileData,
  Subcategory,
} from './types';

export const emptyProduct: ProductData = {
  id: '',
  title: '',
  images: [],
  descriptionShort: '',
  descriptionFull: '',
  price: 0,
  discountedPrice: 0,
  categoryName: '',
  rating: '5',
};

export const emptySubcategory: Subcategory = {
  id: '',
  name: '',
};

export const emptyCategory: MainCategory = {
  id: '',
  name: '',
  subCategory: [],
};

export const DefaultAccountSettingData: AccountSettingsData = {
  firstName: 'Dianne',
  lastName: 'Russell',
  email: 'user@example.com',
  birthDate: '1999-10-10',
};

export const DefaultProfileData: ProfileData = {
  version: 0,
  accountSettingData: DefaultAccountSettingData,
  accountAddresses: [],
};

export const productPerPage = 6;

export const DefaultCartData: CartData = {
  id: '',
  version: 0,
  totalPrice: 0,
  discount: 0,
  fullPrice: 0,
  products: [],
};
