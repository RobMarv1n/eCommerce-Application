import type { Category } from '@commercetools/platform-sdk';
import type { MyCategory } from '../types';
import { emptyRootCategory } from '../constants';

export function parseCategories(categories: Category[]): MyCategory {
  const mainCategory: MyCategory = emptyRootCategory;
  mainCategory.subCategories = categories
    .filter((category) => !category.parent)
    .map((category) => ({
      id: category.id,
      name: category.name['en-US'],
      subCategories: [],
    }));
  for (const subCategory of mainCategory.subCategories) {
    subCategory.subCategories = categories
      .filter(
        (category) => category.parent && category.parent.id === subCategory.id
      )
      .map((category) => ({
        id: category.id,
        name: category.name['en-US'],
        subCategories: [],
      }));
  }
  return mainCategory;
}
