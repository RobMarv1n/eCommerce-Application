import { ProductData } from '../../../../shared/api/clientApi/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './productsList.css';

type Properties = {
  products: ProductData[];
};

export function ProductsList({ products }: Properties) {
  const styles =
    'products-list' + (products.length === 0 ? ' no-products' : '');

  return (
    <div className={styles}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
      {products.length === 0 && <h1>No products found</h1>}
    </div>
  );
}
