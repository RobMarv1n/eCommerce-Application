import { client } from '../../../../shared/api/clientApi/ClientApi';
import { CartData } from '../../../../shared/api/clientApi/types';
import { Button } from '../../../../shared/ui/Button';

import styles from './ClearCartNotification.module.css';

type Properties = {
  setCardData: React.Dispatch<React.SetStateAction<CartData>>;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export function ClearCartNotification({
  setCardData,
  setCartCount,
}: Properties) {
  return (
    <div className={styles.clearCartNotification}>
      <p className={styles.notificationMessage}>
        Are you sure you want to clear the cart?
      </p>
      <Button
        onClick={async () => {
          await client.cleanCart();
          setCardData(client.cartData);
          setCartCount(client.cartCount);
        }}
      >
        Confirm
      </Button>
    </div>
  );
}
