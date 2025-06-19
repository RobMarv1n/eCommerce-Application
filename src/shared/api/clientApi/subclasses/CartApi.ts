import { ByProjectKeyRequestBuilder, Cart } from '@commercetools/platform-sdk';
import { CartData } from '../types';
import { DefaultCartData } from '../constants';
import { parseCartData } from '../parsers/parseCartData';

export class CartApi {
  public cartData: CartData;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor(apiRoot: ByProjectKeyRequestBuilder) {
    this.apiRoot = apiRoot;
    this.cartData = DefaultCartData;
  }

  public async createCart(): Promise<Cart> {
    const cart = await this.apiRoot
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute();
    return cart.body;
  }

  public async addCartProduct(productId: string): Promise<void> {
    if (this.cartData.id === '') {
      const cart = await this.createCart();
      this.cartData.id = cart.id;
      this.cartData.version = cart.version;
    }

    const cart = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartData.id })
      .post({
        body: {
          actions: [{ action: 'addLineItem', productId }],
          version: this.cartData.version,
        },
      })
      .execute();
    this.cartData = parseCartData(cart.body);
  }

  public async removeCardProduct(
    productId: string,
    all: boolean = false
  ): Promise<void> {
    const product = this.cartData.products.find(
      (product) => product.id === productId
    );
    if (product === undefined) return;

    const cart = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartData.id })
      .post({
        body: {
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: product.lineItemId,
              quantity: all ? product.quantity : 1,
            },
          ],
          version: this.cartData.version,
        },
      })
      .execute();
    this.cartData = parseCartData(cart.body);
  }

  public async cleanCart(): Promise<void> {
    const productIds = this.cartData.products.map((product) => product.id);
    for (const productId of productIds)
      await this.removeCardProduct(productId, true);
  }

  public async getCartData(): Promise<void> {
    if (this.cartData.id == '') return;
    const cart = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartData.id })
      .get()
      .execute();
    this.cartData = parseCartData(cart.body);
  }

  public inCart(id: string): boolean {
    return this.cartData.products.some((product) => product.id === id);
  }

  public get cartCount(): number {
    return this.cartData.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }

  public async setCartDiscountCode(code: string): Promise<void> {
    const cart = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartData.id })
      .post({
        body: {
          actions: [
            {
              action: 'addDiscountCode',
              code,
            },
          ],
          version: this.cartData.version,
        },
      })
      .execute();
    this.cartData = parseCartData(cart.body);
  }
}
