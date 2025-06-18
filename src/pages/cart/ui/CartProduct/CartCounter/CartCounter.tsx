import { useState } from 'react';

import styles from './CartCounter.module.css';
import { CartProductData } from '../../../../../shared/api/clientApi/types';
import { client } from '../../../../../shared/api/clientApi/ClientApi';
import { useCartCount, useCartData } from '../../CartContexts/CartContexts';

interface CounterProperties {
  className?: string;
  min?: number;
  max?: number;
  product: CartProductData;
}

export function CartCounter({
  className = '',
  min = 1,
  max = Infinity,
  product,
}: CounterProperties) {
  const [internalValue, setInternalValue] = useState(product.quantity ?? min);
  const { setCartCount } = useCartCount();
  const { setCartData } = useCartData();

  async function increment() {
    if (internalValue < max) {
      await client.addCartProduct(product.id);
      setCartData(client.cartData);
      setCartCount(client.cartCount);
      setInternalValue((internalValue) => internalValue + 1);
    }
  }

  async function decrement() {
    if (internalValue > min) {
      await client.removeCardProduct(product.id);
      setCartData(client.cartData);
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
