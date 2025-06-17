import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../shared/ui/Button';
import { LinkButton } from '../../../../shared/ui/LinkButton';
import { CartProduct } from '../CartProduct/CartProduct';
import { Modal } from '../../../../shared/ui/Modal';
import { ClearCartNotification } from '../ClearCartNotification/ClearCartNotification';

import { ROUTES } from '../../../../types';
import { CartData } from '../../../../shared/api/clientApi/types';

import styles from './CartProducts.module.css';

type Properties = {
  cardData: CartData;
  setCardData: React.Dispatch<React.SetStateAction<CartData>>;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export function CartProducts({
  cardData,
  setCardData,
  setCartCount,
}: Properties) {
  const [modalOpen, setModalOpen] = useState(false);

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
        {cardData.products.map((product) => (
          <CartProduct
            product={product}
            setCardData={setCardData}
            setCartCount={setCartCount}
            key={product.id}
          />
        ))}

        {cardData.products.length === 0 && (
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

        {modalOpen && cardData.products.length > 0 && (
          <Modal onClose={() => setModalOpen(false)}>
            <ClearCartNotification
              setCardData={setCardData}
              setCartCount={setCartCount}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
