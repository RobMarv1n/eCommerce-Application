import type {
  Attribute,
  Price,
  ProductProjection,
} from '@commercetools/platform-sdk';
import type { AttributesData, ProductData } from './types';
import { client } from './ClientApi';

export function parseProduct(result: ProductProjection): ProductData {
  const variant = result.masterVariant;
  const { title, descriptionShort, descriptionFull } = parseAttributes(
    variant.attributes
  );
  const categoryId = result.categories[0].id;

  return {
    id: result.id,
    title,
    images: variant.images?.map((s) => s.url) || [],
    descriptionShort,
    descriptionFull,
    price: parsePrice(variant.prices),
    discountedPrice: parseDiscountedPrice(variant.prices),
    categoryName: client.getCategoryName(categoryId),
  };
}

function parsePrice(prices: Price[] | undefined): number {
  if (prices && prices.length > 0) {
    const { centAmount = 0, fractionDigits = 0 } = prices[0].value;
    return centAmount / Math.pow(10, fractionDigits);
  }
  return 0;
}

function parseDiscountedPrice(prices: Price[] | undefined): number {
  if (prices && prices.length > 0 && prices[0].discounted) {
    const { centAmount = 0, fractionDigits = 0 } = prices[0].discounted.value;
    return centAmount / Math.pow(10, fractionDigits);
  }
  return 0;
}

function parseAttributes(attributes: Attribute[] | undefined): AttributesData {
  const result: AttributesData = {
    title: '',
    descriptionShort: '',
    descriptionFull: '',
  };
  if (attributes) {
    const object: { [index: string]: string } = {};
    for (const item of attributes) {
      object[item.name] = item.value;
    }
    result.title = object['title'] || '';
    result.descriptionShort = object['description_short'] || '';
    result.descriptionFull = object['description_full'] || '';
  }
  return result;
}
