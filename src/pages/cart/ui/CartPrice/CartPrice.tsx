import { CartData } from '../../../../shared/api/clientApi/types';
import { Button } from '../../../../shared/ui/Button';

import styles from './CartPrice.module.css';

type Properties = {
  cartData: CartData;
};

export function CartPrice({ cartData }: Properties) {
  return (
    <div className={styles.cartPrice}>
      <div className={styles.cartPriceTitle}>Cart Total</div>
      <div className={styles.cartPriceList}>
        <div className={styles.cartPriceItem}>
          <div>Subtotal:</div>
          <div className={styles.cartSubtotalValue}>
            ${cartData.fullPrice?.toFixed(2)}
          </div>
        </div>
        <div className={styles.cartPriceItem}>
          <div>Cart Discount:</div>
          <div className={styles.cartDiscountValue}>
            -${cartData.discount.toFixed(2)}
          </div>
        </div>
        <div className={`${styles.cartPriceItem} ${styles.cartPriceTotal}`}>
          <div>Total:</div>
          <div className={styles.cartTotalValue}>
            ${cartData.totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
      <Button className={styles.cartPriceButton}>Proceed to checkout</Button>
    </div>
  );
}
