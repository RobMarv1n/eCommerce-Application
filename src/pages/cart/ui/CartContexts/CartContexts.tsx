import { createContext, useContext } from 'react';
import { DefaultCartData } from '../../../../shared/api/clientApi/constants';
import { CartCountContextValue, CartDataContextValue } from './types';

const defaultCartCountContext: CartCountContextValue = {
  cartCount: 0,
  setCartCount: () => {},
};

const defaultCartDataContext: CartDataContextValue = {
  cartData: DefaultCartData,
  setCartData: () => {},
};

export const CartCountContext = createContext(defaultCartCountContext);
export const CartDataContext = createContext(defaultCartDataContext);

export const useCartCount = () => useContext(CartCountContext);
export const useCartData = () => useContext(CartDataContext);
