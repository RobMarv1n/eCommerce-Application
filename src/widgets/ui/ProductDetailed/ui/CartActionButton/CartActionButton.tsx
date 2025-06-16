import { useEffect, useState } from 'react';
import { Button } from '../../../../../shared/ui/Button';
import { CartIcon } from '../../../../../shared/ui/Icon/CartIcon';
import { toast } from 'sonner';

import styles from './CartActionButton.module.css';
import { client } from '../../../../../shared/api/clientApi/ClientApi';

interface CartActionButtonProperties {
  productId: string;
  productTitle: string;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

export function CartActionButton({
  productId,
  productTitle,
  setCartCount,
}: CartActionButtonProperties) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(client.inCart(productId));
  }, [productId]);

  async function handleClick() {
    const result = inCart
      ? await client.removeCardProduct(productId)
      : await client.addCartProduct(productId);
    setCartCount(client.cartCount);

    const next = !inCart;
    setInCart(next);
    toast.success(
      next
        ? `${productTitle} has been added to cart`
        : `${productTitle} has been removed from cart`
    );
    return result;
  }

  return (
    <Button className={styles.cartActionButton} onClick={handleClick}>
      {inCart ? 'Remove from Cart' : 'Add to Cart'}
      <CartIcon width="18" height="18" color="#fff" />
    </Button>
  );
}
