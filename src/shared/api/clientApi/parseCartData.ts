import { Cart } from '@commercetools/platform-sdk';
import { CartData, CartProduct } from './types';

export function parseCartData(cart: Cart): CartData {
  const data: CartData = { id: cart.id, version: cart.version, products: [] };

  if (cart.lineItems)
    data.products = cart.lineItems.map((lineItem) => {
      const product: CartProduct = {
        id: lineItem.productId,
        image: '',
        quantity: lineItem.quantity,
        lineItemId: lineItem.id,
      };
      if (lineItem.variant.images)
        product.image = lineItem.variant.images[0].url;

      return product;
    });

  return data;
}
