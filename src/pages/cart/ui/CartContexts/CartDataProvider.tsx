import { useState } from 'react';
import { CartData } from '../../../../shared/api/clientApi/types';
import { DefaultCartData } from '../../../../shared/api/clientApi/constants';
import { CartDataContextValue } from './types';
import { CartDataContext } from './CartContexts';

type Properties = {
  children: React.ReactNode;
};

export function CartDataProvider({ children }: Properties) {
  const [cartData, setCartData] = useState<CartData>(DefaultCartData);

  const value: CartDataContextValue = {
    cartData,
    setCartData: (data) => setCartData(data),
  };

  return (
    <CartDataContext.Provider value={value}>
      {children}
    </CartDataContext.Provider>
  );
}
