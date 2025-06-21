import { useNavigate } from 'react-router-dom';
import { ProductData } from '../../../../shared/api/clientApi/types';
import { RatingStars } from '../../../../shared/ui/RatingStars/RatingStars';
import { CartIcon } from '../../../../shared/ui/Icon/CartIcon';

import './ProductCard.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCartCount } from '../../../cart/ui/CartContexts/CartContexts';
import { SpinnerCircularFixed } from 'spinners-react';

type Properties = {
  product: ProductData;
};

export function ProductCard({ product }: Properties) {
  const navigation = useNavigate();
  const { setCartCount } = useCartCount();
  const [loading, setLoading] = useState(false);

  const { id, title, images, descriptionShort, price, discountedPrice } =
    product;

  const [inCart, setInCart] = useState(client.cartApi.inCart(id));

  return (
    <div
      className="product-card"
      onClick={() => {
        navigation(`/catalog/${id}`);
      }}
    >
      <img className="product-image" src={images[0]} alt="" />
      <h4 className="product-title">{title}</h4>
      <p>{descriptionShort}</p>
      <div className="prices">
        <p className="discount">${discountedPrice.toFixed(2)}</p>
        {price !== discountedPrice && (
          <p className="price">${price.toFixed(2)}</p>
        )}
      </div>
      <RatingStars rating={product.rating} />

      <button
        className="product-card-button"
        aria-label="Add to Cart"
        title="Add to Cart"
        disabled={inCart}
        onClick={async (event) => {
          event.stopPropagation();
          setInCart(true);
          setLoading(true);
          await client.cartApi.addCartProduct(id);
          setCartCount(client.cartApi.cartCount);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          toast.success(`${title} has been added to cart`);
        }}
      >
        {!loading && <CartIcon width="18" height="18" />}
        {loading && (
          <SpinnerCircularFixed
            size={40}
            thickness={200}
            secondaryColor="rgba(0, 178, 7, 0.3)"
          />
        )}
      </button>
    </div>
  );
}
