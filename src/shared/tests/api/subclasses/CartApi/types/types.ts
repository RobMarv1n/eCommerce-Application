import type {
  Cart,
  CartAddDiscountCodeAction,
  CartAddLineItemAction,
  CartRemoveLineItemAction,
  CentPrecisionMoney,
} from '@commercetools/platform-sdk';
import { LineItem } from '@commercetools/platform-sdk';

export type MutableCart = Omit<Cart, 'lineItems' | 'totalPrice'> & {
  lineItems: LineItem[];
  totalPrice: CentPrecisionMoney;
};

export type CartAction =
  | CartAddLineItemAction
  | CartRemoveLineItemAction
  | CartAddDiscountCodeAction;
