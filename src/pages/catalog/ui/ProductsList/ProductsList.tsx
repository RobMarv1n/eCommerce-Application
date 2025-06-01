import { ProductData } from '../../../../shared/api/clientApi/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './productsList.css';

type Properties = {
  products: ProductData[];
};

export function ProductsList({ products }: Properties) {
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
