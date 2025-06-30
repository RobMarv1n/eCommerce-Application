import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { vi } from 'vitest';
import { CartAction, MutableCart } from '../types/types';
import { getCartState, setCartState } from './cartState';
import { createMockMoney } from './createMockMoney';

export const createMockApiRoot = (): ByProjectKeyRequestBuilder => {
  return {
    me: () => ({
      carts: () => ({
        post: () => ({
          execute: vi.fn().mockResolvedValue({
            body: getCartState(),
          }),
        }),
        withId: () => ({
          get: () => ({
            execute: vi.fn().mockResolvedValue({ body: getCartState() }),
          }),
          post: ({
            body: { actions },
          }: {
            body: { actions: CartAction[]; version: number };
          }) => {
            const currentCart = getCartState();
            const updatedCart: MutableCart = {
              ...currentCart,
              lineItems: [...currentCart.lineItems],
              version: currentCart.version + 1,
            };

            for (const action of actions) {
              switch (action.action) {
                case 'addLineItem': {
                  const existingIndex = updatedCart.lineItems.findIndex(
                    (item) => item.productId === action.productId
                  );

                  if (existingIndex === -1) {
                    updatedCart.lineItems.push({
                      id: `line-${action.productId}-${Date.now()}`,
                      productId: action.productId ?? '',
                      quantity: 1,
                      price: {
                        id: Math.random().toString(),
                        value: createMockMoney(1000),
                      },
                      totalPrice: createMockMoney(1000),
                      name: { en: 'Mock Product' },
                      variant: {
                        id: 1,
                        sku: 'mock-sku',
                      },
                      addedAt: new Date().toISOString(),
                      lineItemMode: 'Standard',
                      state: [],
                      taxedPrice: undefined,
                      priceMode: 'Platform',
                      productType: {
                        id: 'product-type-id',
                        typeId: 'product-type',
                      },
                      discountedPricePerQuantity: [],
                      taxedPricePortions: [],
                      perMethodTaxRate: [],
                    });
                  } else {
                    const existingItem = updatedCart.lineItems[existingIndex];
                    updatedCart.lineItems[existingIndex] = {
                      ...existingItem,
                      quantity: existingItem.quantity + 1,
                      totalPrice: createMockMoney(
                        existingItem.totalPrice.centAmount + 1000
                      ),
                    };
                  }
                  break;
                }

                case 'removeLineItem': {
                  const index = updatedCart.lineItems.findIndex(
                    (item) => item.id === action.lineItemId
                  );

                  if (index !== -1) {
                    const item = updatedCart.lineItems[index];
                    const newQuantity = item.quantity - (action.quantity ?? 1);

                    if (newQuantity > 0) {
                      updatedCart.lineItems[index] = {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: createMockMoney(
                          item.price.value.centAmount * newQuantity
                        ),
                      };
                    } else {
                      updatedCart.lineItems.splice(index, 1);
                    }
                  }
                  break;
                }
                case 'addDiscountCode': {
                  updatedCart.discountCodes.push({
                    discountCode: {
                      typeId: 'discount-code',
                      id: action.code,
                    },
                    state: 'Added',
                  });
                  break;
                }
              }
            }

            updatedCart.totalPrice = createMockMoney(
              updatedCart.lineItems.reduce(
                (sum, item) => sum + item.totalPrice.centAmount,
                0
              )
            );

            setCartState(structuredClone(updatedCart));

            return {
              execute: vi.fn().mockResolvedValue({ body: updatedCart }),
            };
          },
        }),
      }),
    }),
  } as unknown as ByProjectKeyRequestBuilder;
};
