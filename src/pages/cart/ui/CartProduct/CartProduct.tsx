import { DeleteButton } from '../../../../shared/ui/DeleteButton';

import styles from './CartProduct.module.css';
import { CartProductData } from '../../../../shared/api/clientApi/types';
import { CartCounter } from './CartCounter';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { useCartCount, useCartData } from '../CartContexts/CartContexts';

type Properties = {
  product: CartProductData;
};

export function CartProduct({ product }: Properties) {
  const { setCartCount } = useCartCount();
  const { setCartData } = useCartData();

  const deleteClick = async () => {
    await client.removeCardProduct(product.id, true);
    setCartData(client.cartData);
    setCartCount(client.cartCount);
  };

  return (
    <div className={styles.cartProduct}>
      <div className={styles.cartProductWrapper}>
        <div className={styles.cartProductImage}>
          <img src={product.image} alt="product" width="100" height="100" />
        </div>
        <div className={styles.cartProductName}>{product.title}</div>
      </div>
      <div className={styles.cartProductPrice}>${product.price.toFixed(2)}</div>
      <CartCounter product={product} className={styles.cartProductCounter} />
      <div className={styles.cartProductSubtotal}>
        ${product.totalPrice.toFixed(2)}
      </div>
      <DeleteButton
        onClick={deleteClick}
        className={styles.cartProductDelete}
      />
    </div>
  );
}
