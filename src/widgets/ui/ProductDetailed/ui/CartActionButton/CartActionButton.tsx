import { useState } from 'react';
import { Button } from '../../../../../shared/ui/Button';
import { CartIcon } from '../../../../../shared/ui/Icon/CartIcon';

import styles from './CartActionButton.module.css';

interface CartActionButtonProperties {
  productId: string;
}

export function CartActionButton({ productId }: CartActionButtonProperties) {
  const [inCart, setInCart] = useState(false);

  function handleClick() {
    setInCart((previous) => !previous);
    console.log(productId);
  }

  return (
    <Button className={styles.cartActionButton} onClick={handleClick}>
      {inCart ? 'Remove from Cart' : 'Add to Cart'}
      <CartIcon width="18" height="18" color="#fff" />
    </Button>
  );
}
