import { useEffect, useState } from 'react';
import { CategoriesList } from './CategoriesList/CategoriesList';
import { FilterItem } from './FilterItem/FilterItem';
import { client } from '../../../shared/api/clientApi/ClientApi';
import { Category, ProductData } from '../../../shared/api/clientApi/types';
import { ProductsList } from './ProductsList/ProductsList';
import './catalog.css';

export function Catalog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);

  async function updateProducts(): Promise<void> {
    const products = await client.getProducts();
    setProducts(products);
  }

  async function initial(): Promise<void> {
    const categories = await client.getCategories();
    const products = await client.getProducts();
    setCategories(categories);
    setProducts(products);
  }

  useEffect(() => {
    initial();
  }, []);

  return (
    <section className="catalog">
      <div>
        <FilterItem title="All categories">
          <CategoriesList
            categories={categories}
            onClick={() => updateProducts()}
          />
        </FilterItem>
      </div>
      <div>
        <ProductsList products={products} />
      </div>
    </section>
  );
}
