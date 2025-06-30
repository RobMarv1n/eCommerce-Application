import { MutableCart } from '../types/types';
import { createMockMoney } from './createMockMoney';

export const initialCartState: MutableCart = {
  id: 'mock-cart-id',
  version: 1,
  lineItems: [],
  totalPrice: createMockMoney(0),
  createdAt: new Date().toISOString(),
  lastModifiedAt: new Date().toISOString(),
  cartState: 'Active',
  refusedGifts: [],
  origin: 'Customer',
  shippingMode: 'Single',
  shipping: [],
  taxMode: 'Platform',
  taxCalculationMode: 'LineItemLevel',
  taxRoundingMode: 'HalfEven',
  customLineItems: [],
  inventoryMode: 'TrackOnly',
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
};

let cartState: MutableCart = initialCartState;

export const getCartState = () => cartState;
export const setCartState = (newState: MutableCart) => {
  cartState = newState;
};
