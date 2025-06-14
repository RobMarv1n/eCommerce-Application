import { Link } from 'react-router-dom';
import { Button } from '../../../../shared/ui/Button';
import { LinkButton } from '../../../../shared/ui/LinkButton';
import { CartProduct } from '../CartProduct/CartProduct';

import { ROUTES } from '../../../../types';

import styles from './CartProducts.module.css';

export function CartProducts() {
  return (
    <div className={styles.cartProducts}>
      <div className={styles.cartProductsHeader}>
        <span className={styles.cartHeaderColumn}>Product</span>
        <span className={styles.cartHeaderColumn}>Price</span>
        <span
          className={`${styles.cartHeaderColumn} ${styles.cartHeaderQuantity}`}
        >
          Quantity
        </span>
        <span className={styles.cartHeaderColumn}>Subtotal</span>
      </div>
      <div className={styles.cartProductsList}>
        <CartProduct />

        <div className={styles.cartProductsEmpty}>
          <p className={styles.cartProductsMessage}>
            Oops! Looks like you haven&rsquo;t added any items to&nbsp;your cart
            yet
          </p>
          <Link className={styles.cartProductsLink} to={ROUTES.CATALOG}>
            Continue Shopping
          </Link>
        </div>
      </div>
      <div className={styles.cartProductsCTA}>
        <LinkButton to={ROUTES.CATALOG} className={styles.cartProductsButton}>
          Return to shop
        </LinkButton>
        <Button className={styles.cartProductsButton}>
          Clear Shopping Cart
        </Button>
      </div>
    </div>
  );
}
