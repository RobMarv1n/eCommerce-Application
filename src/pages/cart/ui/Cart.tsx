import { CartProducts } from './CartProducts/CartProducts';
import { CartPrice } from './CartPrice/CartPrice';
import { CartCoupon } from './CartCoupon/CartCoupon';

import styles from './Cart.module.css';
import { useEffect } from 'react';
import { client } from '../../../shared/api/clientApi/ClientApi';
import { useCartData } from './CartContexts/CartContexts';

export function Cart() {
  const { setCartData } = useCartData();

  async function initial(): Promise<void> {
    await client.getCartData();
    setCartData(client.cartData);
  }

  useEffect(() => {
    initial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={`${styles.cart} container`}>
      <h1 className={`${styles.cartTitle} title`}>My Shopping Cart</h1>
      <div className={styles.cartWrapper}>
        <CartProducts />
        <CartPrice />
        <CartCoupon />
      </div>
    </section>
  );
}
