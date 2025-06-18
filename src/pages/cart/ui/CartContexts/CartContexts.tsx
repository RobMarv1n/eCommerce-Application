import { createContext, useContext } from 'react';
import { ContextValue } from './types';

const defaultCartCountContext: ContextValue = {
  cartCount: 0,
  setCartCount: () => {},
};

export const CartCountContext = createContext(defaultCartCountContext);

export const useCartCount = () => useContext(CartCountContext);
