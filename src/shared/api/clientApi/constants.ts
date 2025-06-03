import { AccountSettingsData } from '../../../pages/profile/types/types';
import { MainCategory, ProductData, ProfileData, Subcategory } from './types';

export const emptyProduct: ProductData = {
  id: '',
  title: '',
  images: [],
  descriptionShort: '',
  descriptionFull: '',
  price: 0,
  discountedPrice: 0,
  categoryName: '',
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
};
