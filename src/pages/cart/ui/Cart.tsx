import { CartProducts } from './CartProducts/CartProducts';
import { CartPrice } from './CartPrice/CartPrice';
import { CartCoupon } from './CartCoupon/CartCoupon';

import styles from './Cart.module.css';
import { useEffect, useState } from 'react';
import { client } from '../../../shared/api/clientApi/ClientApi';
import { CartData } from '../../../shared/api/clientApi/types';
import { DefaultCartData } from '../../../shared/api/clientApi/constants';

export function Cart() {
  const [cartData, setCartData] = useState<CartData>(DefaultCartData);

  async function initial(): Promise<void> {
    await client.getCartData();
    setCartData(client.cartData);
  }

  useEffect(() => {
    initial();
  }, []);

  return (
    <section className={`${styles.cart} container`}>
      <h1 className={`${styles.cartTitle} title`}>My Shopping Cart</h1>
      <div className={styles.cartWrapper}>
        <CartProducts cardData={cartData} setCardData={setCartData} />
        <CartPrice cartData={cartData} />
        <CartCoupon setCardData={setCartData} />
      </div>
    </section>
  );
}
