import { Button } from '../../../../shared/ui/Button';

import styles from './CartCoupon.module.css';

export function CartCoupon() {
  return (
    <div className={styles.cartCoupon}>
      <div className={styles.cartCouponTitle}>Coupon Code</div>
      <div className={styles.cartCouponField}>
        <input
          className={styles.cartCouponInput}
          type="text"
          name="coupon"
          id="coupon"
          placeholder="Enter code"
        />
        <Button className={styles.cartCouponButton}>Apply</Button>
      </div>
    </div>
  );
}
