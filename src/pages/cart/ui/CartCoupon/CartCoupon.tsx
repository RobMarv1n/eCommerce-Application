import { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';

import styles from './CartCoupon.module.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { toast } from 'sonner';
import { CartData } from '../../../../shared/api/clientApi/types';

type Properties = {
  setCardData: React.Dispatch<React.SetStateAction<CartData>>;
};

export function CartCoupon({ setCardData }: Properties) {
  const [text, setText] = useState('');

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
                setCardData(client.cartData);
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
