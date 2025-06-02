import type { Category } from '@commercetools/platform-sdk';
import type { MainCategory } from './types';

export function parseCategories(categories: Category[]): MainCategory[] {
  const mainCategories: Category[] = categories.filter(
    (category) => !category.parent
  );
  return mainCategories.map((category) => ({
    id: category.id,
    name: category.name['en-US'],
    subCategory: categories
      .filter(
        (subcategory) =>
          subcategory.parent && subcategory.parent.id === category.id
      )
      .map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.name['en-US'],
      })),
  }));
}
