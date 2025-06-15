import { useNavigate } from 'react-router-dom';
import { ProductData } from '../../../../shared/api/clientApi/types';
import { RatingStars } from '../../../../shared/ui/RatingStars/RatingStars';
import { CartIcon } from '../../../../shared/ui/Icon/CartIcon';

import './ProductCard.css';

type Properties = {
  product: ProductData;
};

export function ProductCard({ product }: Properties) {
  const navigation = useNavigate();

  const { id, title, images, descriptionShort, price, discountedPrice } =
    product;

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
        onClick={(event) => {
          event.stopPropagation();
          console.log('add to cart');
        }}
      >
        <CartIcon width="18" height="18" />
      </button>
    </div>
  );
}
