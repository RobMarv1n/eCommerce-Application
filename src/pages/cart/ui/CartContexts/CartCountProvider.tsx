import { useState } from 'react';
import { CartCountContext } from './CartContexts';
import { CartCountContextValue } from './types';

type Properties = {
  children: React.ReactNode;
};

export function CartCountProvider({ children }: Properties) {
  const [cartCount, setCartCount] = useState(0);

  const value: CartCountContextValue = {
    cartCount,
    setCartCount: (count) => setCartCount(count),
  };

  return (
    <CartCountContext.Provider value={value}>
      {children}
    </CartCountContext.Provider>
  );
}
