import { useState } from 'react';
import { ContextValue } from './types';
import { CartCountContext } from './CartContexts';

type Properties = {
  children: React.ReactNode;
};

export function CartCountProvider({ children }: Properties) {
  const [cartCount, setCartCount] = useState(0);

  const value: ContextValue = {
    cartCount,
    setCartCount: (count) => setCartCount(count),
  };

  return (
    <CartCountContext.Provider value={value}>
      {children}
    </CartCountContext.Provider>
  );
}
