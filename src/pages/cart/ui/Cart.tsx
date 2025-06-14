import { CartProducts } from './CartProducts/CartProducts';
import { CartPrice } from './CartPrice/CartPrice';
import { CartCoupon } from './CartCoupon/CartCoupon';

import styles from './Cart.module.css';

export function Cart() {
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
