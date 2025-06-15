import { useState } from 'react';
import { Button } from '../../../../../shared/ui/Button';
import { CartIcon } from '../../../../../shared/ui/Icon/CartIcon';
import { toast } from 'sonner';

import styles from './CartActionButton.module.css';

interface CartActionButtonProperties {
  productId: string;
  productTitle: string;
}

export function CartActionButton({
  productId,
  productTitle,
}: CartActionButtonProperties) {
  const [inCart, setInCart] = useState(false);

  function handleClick() {
    const next = !inCart;
    setInCart(next);
    toast.success(
      next
        ? `${productTitle} has been added to cart`
        : `${productTitle} has been removed from cart`
    );
    console.log(productId);
  }

  return (
    <Button className={styles.cartActionButton} onClick={handleClick}>
      {inCart ? 'Remove from Cart' : 'Add to Cart'}
      <CartIcon width="18" height="18" color="#fff" />
    </Button>
  );
}
