import { beforeEach, describe, expect, test } from 'vitest';
import { CartApi } from '../../../../api/clientApi/subclasses/CartApi';
import {
  getCartState,
  initialCartState,
  setCartState,
} from './mocks/cartState';
import { createMockApiRoot } from './mocks/createMockApiRoot';

describe('CartApi', () => {
  let cartApi: CartApi;

  beforeEach(() => {
    const mockApiRoot = createMockApiRoot();
    cartApi = new CartApi(mockApiRoot);
    setCartState(initialCartState);
  });

  test('should create a cart', async () => {
    const cart = await cartApi.createCart();
    expect(cart.id).toBe('mock-cart-id');
    expect(cart.version).toBe(1);
  });

  test('should add a product to the cart', async () => {
    await cartApi.addCartProduct('mock-product-id');
    expect(cartApi.cartData.products).toHaveLength(1);
    expect(cartApi.cartData.products[0].id).toBe('mock-product-id');
    expect(cartApi.cartData.products[0].quantity).toBe(1);
    expect(cartApi.cartData.products[0].totalPrice).toBe(10);
  });

  test('should add multiple products to the cart', async () => {
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.addCartProduct('mock-product-id1');
    await cartApi.addCartProduct('mock-product-id2');

    expect(cartApi.cartData.products).toHaveLength(3);
    expect(cartApi.cartData.products[0].id).toBe('mock-product-id');
    expect(cartApi.cartData.products[1].id).toBe('mock-product-id1');
    expect(cartApi.cartData.products[2].id).toBe('mock-product-id2');
    expect(cartApi.cartData.totalPrice).toBe(30);
  });

  test('should remove one product from the cart', async () => {
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.addCartProduct('mock-product-id1');
    await cartApi.addCartProduct('mock-product-id2');
    expect(cartApi.cartData.products.length).toBe(3);
    expect(cartApi.cartData.totalPrice).toBe(30);
    await cartApi.removeCardProduct('mock-product-id', true);
    expect(cartApi.cartData.products.length).toBe(2);
    expect(cartApi.cartData.totalPrice).toBe(20);
  });

  test('should remove one quantity of a product from the cart', async () => {
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.addCartProduct('mock-product-id');
    expect(cartApi.cartData.products[0].quantity).toBe(2);
    expect(cartApi.cartData.totalPrice).toBe(20);
    await cartApi.removeCardProduct('mock-product-id');
    expect(cartApi.cartData.products[0].quantity).toBe(1);
    expect(cartApi.cartData.totalPrice).toBe(10);
  });

  test('should clean the cart', async () => {
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.addCartProduct('mock-product-id2');
    await cartApi.addCartProduct('mock-product-id3');
    expect(cartApi.cartData.products).toHaveLength(3);
    expect(cartApi.cartData.totalPrice).toBe(30);
    await cartApi.cleanCart();
    expect(cartApi.cartData.products).toHaveLength(0);
    expect(cartApi.cartData.totalPrice).toBe(0);
  });

  test('should get cart data', async () => {
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.getCartData();
    expect(cartApi.cartData.id).toBe('mock-cart-id');
  });

  test('should check if a product is in the cart', async () => {
    await cartApi.addCartProduct('mock-product-id');
    expect(cartApi.inCart('mock-product-id')).toBe(true);
    expect(cartApi.inCart('falsy-test-id')).toBe(false);
  });

  test('should return total cart count', async () => {
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.addCartProduct('mock-product-id1');
    expect(cartApi.cartCount).toBe(4);
  });

  test('should apply a discount code', async () => {
    await cartApi.addCartProduct('mock-product-id');
    await cartApi.setCartDiscountCode('DISCOUNT');
    expect(getCartState().discountCodes).toHaveLength(1);
    expect(getCartState().discountCodes[0].discountCode.id).toBe('DISCOUNT');
  });
});
