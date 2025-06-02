import { MainCategory, ProductData, Subcategory } from './types';

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
