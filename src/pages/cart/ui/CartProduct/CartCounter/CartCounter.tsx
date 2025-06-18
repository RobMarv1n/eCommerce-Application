import { useState } from 'react';

import styles from './CartCounter.module.css';
import {
  CartData,
  CartProductData,
} from '../../../../../shared/api/clientApi/types';
import { client } from '../../../../../shared/api/clientApi/ClientApi';
import { useCartCount } from '../../CartContexts/CartContexts';

interface CounterProperties {
  className?: string;
  min?: number;
  max?: number;
  product: CartProductData;
  setCardData: React.Dispatch<React.SetStateAction<CartData>>;
}

export function CartCounter({
  className = '',
  min = 1,
  max = Infinity,
  product,
  setCardData,
}: CounterProperties) {
  const [internalValue, setInternalValue] = useState(product.quantity ?? min);
  const { setCartCount } = useCartCount();

  async function increment() {
    if (internalValue < max) {
      await client.addCartProduct(product.id);
      setCardData(client.cartData);
      setCartCount(client.cartCount);
      setInternalValue((internalValue) => internalValue + 1);
    }
  }

  async function decrement() {
    if (internalValue > min) {
      await client.removeCardProduct(product.id);
      setCardData(client.cartData);
      setCartCount(client.cartCount);
      setInternalValue((internalValue) => internalValue - 1);
    }
  }

  return (
    <div className={`${styles.counter} ${className}`}>
      <button className={styles.counterBtn} onClick={decrement}>
        -
      </button>
      <span>{internalValue}</span>
      <button className={styles.counterBtn} onClick={increment}>
        +
      </button>
    </div>
  );
}
