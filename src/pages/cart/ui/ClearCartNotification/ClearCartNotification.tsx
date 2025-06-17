import { Button } from '../../../../shared/ui/Button';

import styles from './ClearCartNotification.module.css';

export function ClearCartNotification() {
  return (
    <div className={styles.clearCartNotification}>
      <p className={styles.notificationMessage}>
        Are you sure you want to clear the cart?
      </p>
      <Button>Confirm</Button>
    </div>
  );
}
