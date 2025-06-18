import { CartData } from '../../../../shared/api/clientApi/types';

export type CartCountContextValue = {
  cartCount: number;
  setCartCount: (count: number) => void;
};

export type CartDataContextValue = {
  cartData: CartData;
  setCartData: (data: CartData) => void;
};
