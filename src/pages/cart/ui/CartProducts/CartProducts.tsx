import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../shared/ui/Button';
import { LinkButton } from '../../../../shared/ui/LinkButton';
import { CartProduct } from '../CartProduct/CartProduct';
import { Modal } from '../../../../shared/ui/Modal';
import { ClearCartNotification } from '../ClearCartNotification/ClearCartNotification';

import { ROUTES } from '../../../../types';

import styles from './CartProducts.module.css';
import { useCartData } from '../CartContexts/CartContexts';

export function CartProducts() {
  const [modalOpen, setModalOpen] = useState(false);
  const { cartData } = useCartData();

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
        {cartData.products.map((product) => (
          <CartProduct product={product} key={product.id} />
        ))}

        {cartData.products.length === 0 && (
          <div className={styles.cartProductsEmpty}>
            <p className={styles.cartProductsMessage}>
              Oops! Looks like you haven&rsquo;t added any items to&nbsp;your
              cart yet
            </p>
            <Link className={styles.cartProductsLink} to={ROUTES.CATALOG}>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
      <div className={styles.cartProductsCTA}>
        <LinkButton to={ROUTES.CATALOG} className={styles.cartProductsButton}>
          Return to shop
        </LinkButton>
        <Button
          className={styles.cartProductsButton}
          onClick={() => setModalOpen(true)}
        >
          Clear Shopping Cart
        </Button>

        {modalOpen && cartData.products.length > 0 && (
          <Modal onClose={() => setModalOpen(false)}>
            <ClearCartNotification />
          </Modal>
        )}
      </div>
    </div>
  );
}
