import { Cart, CentPrecisionMoney, Price } from '@commercetools/platform-sdk';
import { CartData, CartProductData } from '../types';

export function parseCartData(cart: Cart): CartData {
  const data: CartData = {
    id: cart.id,
    version: cart.version,
    totalPrice: parseTotalPrice(cart.totalPrice),
    discount: parseDiscounted(cart),
    products: [],
  };
  data.fullPrice = data.totalPrice - data.discount;

  if (cart.lineItems)
    data.products = cart.lineItems.map((lineItem) => {
      const product: CartProductData = {
        id: lineItem.productId,
        lineItemId: lineItem.id,
        title: '',
        image: '',
        price: parsePrice(lineItem.price),
        quantity: lineItem.quantity,
        totalPrice: parseTotalPrice(lineItem.totalPrice),
      };
      if (lineItem.variant.attributes) {
        const attribute = lineItem.variant.attributes.find(
          (item) => item.name === 'title'
        );
        product.title = attribute ? attribute.value : '';
      }
      if (lineItem.variant.images)
        product.image = lineItem.variant.images[0].url;

      return product;
    });

  return data;
}

function parsePrice(price: Price): number {
  if (price.discounted) {
    const { centAmount = 0, fractionDigits = 0 } = price.discounted.value;
    return centAmount / Math.pow(10, fractionDigits);
  } else {
    const { centAmount = 0, fractionDigits = 0 } = price.value;
    return centAmount / Math.pow(10, fractionDigits);
  }
}

function parseTotalPrice(price: CentPrecisionMoney): number {
  const { centAmount = 0, fractionDigits = 0 } = price;
  return centAmount / Math.pow(10, fractionDigits);
}

function parseDiscounted(cart: Cart): number {
  if (cart.discountOnTotalPrice) {
    const { centAmount = 0, fractionDigits = 0 } =
      cart.discountOnTotalPrice.discountedAmount;
    return centAmount / Math.pow(10, fractionDigits);
  }
  return 0;
}
