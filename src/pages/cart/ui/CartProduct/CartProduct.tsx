import { DeleteButton } from '../../../../shared/ui/DeleteButton';
import { Counter } from '../../../../shared/ui/Counter';

import styles from './CartProduct.module.css';

export function CartProduct() {
  return (
    <div className={styles.cartProduct}>
      <div className={styles.cartProductWrapper}>
        <div className={styles.cartProductImage}>
          <img
            src="/green-capsicum-1.jpg"
            alt="product"
            width="100"
            height="100"
          />
        </div>
        <div className={styles.cartProductName}>Green Capsicum</div>
      </div>
      <div className={styles.cartProductPrice}>$14.00</div>
      <Counter className={styles.cartProductCounter} />
      <div className={styles.cartProductSubtotal}>$70.00</div>
      <DeleteButton className={styles.cartProductDelete} />
    </div>
  );
}
