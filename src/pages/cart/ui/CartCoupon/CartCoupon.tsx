import { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';

import styles from './CartCoupon.module.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { toast } from 'sonner';
import { useCartData } from '../CartContexts/CartContexts';

export function CartCoupon() {
  const [text, setText] = useState('');
  const { setCartData } = useCartData();

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
          value={text}
          disabled={client.cartData.id === ''}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <Button
          disabled={client.cartData.id === ''}
          onClick={() => {
            client
              .setCartDiscountCode(text)
              .then(() => {
                setCartData(client.cartData);
              })
              .catch(() => {
                toast.error('Invalid discount code');
              });
          }}
          className={styles.cartCouponButton}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
