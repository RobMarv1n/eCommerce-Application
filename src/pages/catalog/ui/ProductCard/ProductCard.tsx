import { client } from '../../../../shared/api/clientApi/ClientApi';
import { ProductData } from '../../../../shared/api/clientApi/types';
import './ProductCard.css';

type Properties = {
  product: ProductData;
};

export function ProductCard({ product }: Properties) {
  const { id, title, images, descriptionShort, price, discountedPrice } =
    product;

  return (
    <div
      className="product-card"
      onClick={async () => {
        client.setCurrentProductId(id);
        const productData = await client.getCurrentProduct();
        console.log(productData);
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
    </div>
  );
}
