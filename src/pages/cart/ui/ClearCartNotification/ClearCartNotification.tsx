import { client } from '../../../../shared/api/clientApi/ClientApi';
import { Button } from '../../../../shared/ui/Button';
import { useCartCount, useCartData } from '../CartContexts/CartContexts';

import styles from './ClearCartNotification.module.css';

export function ClearCartNotification() {
  const { setCartCount } = useCartCount();
  const { setCartData } = useCartData();

  return (
    <div className={styles.clearCartNotification}>
      <p className={styles.notificationMessage}>
        Are you sure you want to clear the cart?
      </p>
      <Button
        onClick={async () => {
          await client.cartApi.cleanCart();
          setCartData(client.cartApi.cartData);
          setCartCount(client.cartApi.cartCount);
        }}
      >
        Confirm
      </Button>
    </div>
  );
}
