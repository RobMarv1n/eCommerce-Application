import { DeleteButton } from '../../../../shared/ui/DeleteButton';

import styles from './CartProduct.module.css';
import {
  CartData,
  CartProductData,
} from '../../../../shared/api/clientApi/types';
import { CartCounter } from './CartCounter';
import { client } from '../../../../shared/api/clientApi/ClientApi';

type Properties = {
  product: CartProductData;
  setCardData: React.Dispatch<React.SetStateAction<CartData>>;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export function CartProduct({
  product,
  setCardData,
  setCartCount,
}: Properties) {
  const deleteClick = async () => {
    await client.removeCardProduct(product.id, true);
    setCardData(client.cartData);
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
      <div className={styles.cartProductPrice}>${product.price}</div>
      <CartCounter
        product={product}
        setCardData={setCardData}
        className={styles.cartProductCounter}
      />
      <div className={styles.cartProductSubtotal}>${product.totalPrice}</div>
      <DeleteButton
        onClick={deleteClick}
        className={styles.cartProductDelete}
      />
    </div>
  );
}
